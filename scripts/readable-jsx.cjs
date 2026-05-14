/**
 * Converts react/jsx-runtime _jsx/_jsxs calls into normal JSX and removes the runtime import.
 * Run: node scripts/readable-jsx.cjs
 */
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const ROOT = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.next', '.git']);

function walkJsx(dir, acc = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP.has(e.name)) continue;
      walkJsx(full, acc);
    } else if (e.name.endsWith('.jsx')) {
      acc.push(full);
    }
  }
  return acc;
}

function isJsxRuntimeSource(src) {
  return src === 'react/jsx-runtime' || src === 'react/jsx-dev-runtime';
}

function isJsxCallee(node) {
  return (
    t.isIdentifier(node) &&
    (node.name === '_jsx' || node.name === '_jsxs' || node.name === '_jsxDEV')
  );
}

function hasNestedJsxCallInArguments(callPath) {
  const callNode = callPath.node;
  for (let i = 0; i < callNode.arguments.length; i++) {
    const argPath = callPath.get(`arguments.${i}`);
    let found = false;
    argPath.traverse({
      CallExpression(inner) {
        if (inner.node === callNode) return;
        if (t.isIdentifier(inner.node.callee) && isJsxCallee(inner.node.callee)) {
          found = true;
          inner.stop();
        }
      },
    });
    if (found) return true;
  }
  return false;
}

function memberExpressionToJSXName(me) {
  if (t.isIdentifier(me)) {
    return t.jSXIdentifier(me.name);
  }
  if (
    t.isMemberExpression(me) &&
    !me.computed &&
    t.isIdentifier(me.property)
  ) {
    return t.jSXMemberExpression(
      memberExpressionToJSXName(me.object),
      t.jSXIdentifier(me.property.name)
    );
  }
  return t.jSXIdentifier('div');
}

function tagExprToJSXName(tagExpr) {
  if (t.isStringLiteral(tagExpr)) {
    return t.jSXIdentifier(tagExpr.value);
  }
  if (t.isIdentifier(tagExpr)) {
    return t.jSXIdentifier(tagExpr.name);
  }
  if (t.isMemberExpression(tagExpr)) {
    return memberExpressionToJSXName(tagExpr);
  }
  return t.jSXIdentifier('div');
}

function getJSXClosingNameFromTagExpr(tagExpr) {
  return tagExprToJSXName(tagExpr);
}

function valueToJSXAttributeValue(expr) {
  if (t.isStringLiteral(expr)) {
    return expr;
  }
  if (t.isBooleanLiteral(expr) && expr.value === true) {
    return null;
  }
  return t.jSXExpressionContainer(expr);
}

function objectKeyToJSXAttributeName(key, computed) {
  if (computed) {
    return t.jSXExpressionContainer(key);
  }
  if (t.isIdentifier(key)) {
    return t.jSXIdentifier(key.name);
  }
  if (t.isStringLiteral(key)) {
    return t.jSXIdentifier(key.value);
  }
  return t.jSXIdentifier('data');
}

function parsePropsArg(propsArg) {
  const attributes = [];
  let childrenExpr = undefined;

  if (!propsArg || t.isNullLiteral(propsArg)) {
    return { attributes, childrenExpr };
  }

  if (!t.isObjectExpression(propsArg)) {
    attributes.push(t.jSXSpreadAttribute(propsArg));
    return { attributes, childrenExpr };
  }

  for (const prop of propsArg.properties) {
    if (t.isSpreadElement(prop)) {
      attributes.push(t.jSXSpreadAttribute(prop.argument));
      continue;
    }
    if (!t.isObjectProperty(prop) && !t.isObjectMethod(prop)) {
      continue;
    }
    if (t.isObjectMethod(prop)) {
      continue;
    }

    const key = prop.key;
    const computed = prop.computed;
    const nameStr =
      t.isIdentifier(key) && !computed
        ? key.name
        : t.isStringLiteral(key) && !computed
          ? key.value
          : null;

    if (nameStr === 'children') {
      childrenExpr = prop.value;
      continue;
    }
    if (nameStr === '__self' || nameStr === '__source') {
      continue;
    }

    if (computed || nameStr == null) {
      attributes.push(
        t.jSXSpreadAttribute(t.objectExpression([t.objectProperty(key, prop.value, computed)]))
      );
      continue;
    }

    const attrName = objectKeyToJSXAttributeName(key, computed);
    const val = prop.value;
    const jsxVal = valueToJSXAttributeValue(val);

    if (jsxVal === null) {
      attributes.push(t.jSXAttribute(attrName));
    } else {
      attributes.push(t.jSXAttribute(attrName, jsxVal));
    }
  }

  return { attributes, childrenExpr };
}

function exprToJSXChildren(expr) {
  if (expr == null || t.isNullLiteral(expr)) {
    return [];
  }
  if (t.isJSXElement(expr) || t.isJSXFragment(expr)) {
    return [expr];
  }
  if (t.isStringLiteral(expr)) {
    const s = expr.value;
    if (/^[ \t\n\r]*$/.test(s)) {
      return [];
    }
    if (/[{<}]/.test(s)) {
      return [t.jSXExpressionContainer(expr)];
    }
    return [t.jSXText(s)];
  }
  if (t.isNumericLiteral(expr)) {
    return [t.jSXExpressionContainer(expr)];
  }
  if (t.isArrayExpression(expr)) {
    const out = [];
    for (const el of expr.elements) {
      if (el == null) continue;
      out.push(...exprToJSXChildren(el));
    }
    return out;
  }
  return [t.jSXExpressionContainer(expr)];
}

function callExpressionToJSX(callPath) {
  const call = callPath.node;
  if (!t.isIdentifier(call.callee) || !isJsxCallee(call.callee)) return false;

  const tagArg = call.arguments[0];
  const propsArg = call.arguments[1];
  const keyArg = call.arguments[2];

  if (!tagArg) return false;

  if (t.isIdentifier(tagArg) && tagArg.name === '_Fragment') {
    const { childrenExpr } = parsePropsArg(propsArg);
    const kids = exprToJSXChildren(childrenExpr);
    callPath.replaceWith(
      t.jSXFragment(t.jSXOpeningFragment(), t.jSXClosingFragment(), kids)
    );
    return true;
  }

  const openingName = tagExprToJSXName(tagArg);
  const { attributes, childrenExpr } = parsePropsArg(propsArg);

  if (keyArg) {
    attributes.push(t.jSXAttribute(t.jSXIdentifier('key'), t.jSXExpressionContainer(keyArg)));
  }

  const children = exprToJSXChildren(childrenExpr);
  const selfClosing = children.length === 0;

  const opening = t.jSXOpeningElement(openingName, attributes, selfClosing);

  if (selfClosing) {
    callPath.replaceWith(t.jSXElement(opening, null, [], true));
  } else {
    const closingName = getJSXClosingNameFromTagExpr(tagArg);
    const closing = t.jSXClosingElement(closingName);
    callPath.replaceWith(t.jSXElement(opening, closing, children, false));
  }
  return true;
}

function stripJsxRuntimeImports(ast) {
  traverse(ast, {
    Program(p) {
      p.node.body = p.node.body.filter((stmt) => {
        if (!t.isImportDeclaration(stmt)) return true;
        if (!isJsxRuntimeSource(stmt.source.value)) return true;
        return false;
      });
    },
  });
}

function transformFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  if (!code.includes('react/jsx-runtime') && !code.includes('react/jsx-dev-runtime')) {
    return false;
  }

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      allowReturnOutsideFunction: true,
      errorRecovery: false,
      plugins: [
        'jsx',
        'importAttributes',
        'optionalChaining',
        'nullishCoalescingOperator',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods',
        'topLevelAwait',
        'dynamicImport',
      ],
      tokens: false,
    });
  } catch (e) {
    console.error('Parse failed:', filePath, e.message);
    throw e;
  }

  stripJsxRuntimeImports(ast);

  let iterations = 0;
  const maxIterations = 50000;
  while (iterations < maxIterations) {
    iterations++;
    let replaced = false;
    traverse(ast, {
      CallExpression(p) {
        if (!isJsxCallee(p.node.callee)) return;
        if (hasNestedJsxCallInArguments(p)) return;
        if (callExpressionToJSX(p)) {
          replaced = true;
          p.skip();
        }
      },
    });
    if (!replaced) break;
  }

  if (iterations >= maxIterations) {
    throw new Error(`Max iterations in ${filePath}`);
  }

  const out = generate(
    ast,
    {
      retainLines: false,
      compact: false,
      minified: false,
      jsescOption: { minimal: true },
    },
    code
  ).code;

  fs.writeFileSync(filePath, out.endsWith('\n') ? out : `${out}\n`, 'utf8');
  return true;
}

function main() {
  const dirs = ['app', 'components', 'lib'].map((d) => path.join(ROOT, d));
  const files = [];
  for (const d of dirs) {
    if (fs.existsSync(d)) walkJsx(d, files);
  }

  let n = 0;
  for (const f of files) {
    if (transformFile(f)) {
      console.log('OK', path.relative(ROOT, f));
      n++;
    }
  }
  console.log('Transformed', n, 'files');
}

main();
