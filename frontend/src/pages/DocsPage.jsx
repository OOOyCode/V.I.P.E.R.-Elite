
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Search,
  Book,
  Settings,
  Code,
  Lightbulb,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  FileText,
  Terminal,
  Zap,
  Copy,
  Check,
} from "lucide-react";
const docsSections = [
  {
    id: "getting-started",
    icon: Book,
    items: [
      {
        id: "introduction",
        title: "Introduction",
      },
      {
        id: "quick-start",
        title: "Quick Start Guide",
      },
      {
        id: "system-requirements",
        title: "System Requirements",
      },
    ],
  },
  {
    id: "installation",
    icon: Settings,
    items: [
      {
        id: "download",
        title: "Download",
      },
      {
        id: "setup",
        title: "Setup Process",
      },
      {
        id: "activation",
        title: "License Activation",
      },
    ],
  },
  {
    id: "configuration",
    icon: Zap,
    items: [
      {
        id: "basic-config",
        title: "Basic Configuration",
      },
      {
        id: "advanced-config",
        title: "Advanced Settings",
      },
      {
        id: "environment",
        title: "Environment Variables",
      },
    ],
  },
  {
    id: "api",
    icon: Code,
    items: [
      {
        id: "authentication",
        title: "Authentication",
      },
      {
        id: "endpoints",
        title: "API Endpoints",
      },
      {
        id: "webhooks",
        title: "Webhooks",
      },
    ],
  },
  {
    id: "examples",
    icon: Lightbulb,
    items: [
      {
        id: "basic-example",
        title: "Basic Example",
      },
      {
        id: "advanced-example",
        title: "Advanced Integration",
      },
      {
        id: "best-practices",
        title: "Best Practices",
      },
    ],
  },
  {
    id: "faq",
    icon: HelpCircle,
    items: [
      {
        id: "common-issues",
        title: "Common Issues",
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting",
      },
      {
        id: "support",
        title: "Getting Support",
      },
    ],
  },
];
const codeExample = `// Initialize VIPER ELITE SDK
import { ViperElite } from '@viper-elite/sdk';

const client = new ViperElite({
  apiKey: process.env.VIPER_API_KEY,
  environment: 'production',
});

// Connect to the service
await client.connect();

// Execute a command
const result = await client.execute({
  command: 'dominate',
  target: 'excellence',
});

console.log(result.status); // "success"`;
export default function DocsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState(["getting-started"]);
  const [activeItem, setActiveItem] = useState("introduction");
  const [copiedCode, setCopiedCode] = useState(false);
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };
  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="sticky top-24">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.docs.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all"
                />
              </div>
              <nav className="space-y-2">
                {docsSections.map((section) => {
                  const Icon = section.icon;
                  const isExpanded = expandedSections.includes(section.id);
                  const sectionTitle =
                    t.docs.sections[section.id] || section.id;
                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-2 rounded-lg text-sm hover:bg-secondary/50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-neon-blue" />
                          <span className="font-medium">{sectionTitle}</span>
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 py-2 space-y-1">
                              {section.items.map((item) => (
                                <button
                                  onClick={() => setActiveItem(item.id)}
                                  className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${activeItem === item.id ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
                                  key={item.id}
                                >
                                  {item.title}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
          <motion.main
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="flex-1 min-w-0"
          >
            <GlassCard hover={false} className="p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <FileText className="w-4 h-4" />
                <span>Documentation</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">Getting Started</span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                }}
              >
                Introduction to VIPER ELITE
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Welcome to the VIPER ELITE documentation. This guide will help
                  you get started with our premium technology solutions and
                  unlock the full potential of elite performance.
                </p>
                <h2
                  className="text-2xl font-bold mt-8 mb-4 text-foreground"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Quick Start
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Follow these steps to integrate VIPER ELITE into your project
                  and start dominating your field with superior technology.
                </p>
                <div className="relative mt-6 mb-8">
                  <div className="flex items-center justify-between bg-deep-black rounded-t-lg px-4 py-2 border-b border-border/50">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Terminal className="w-4 h-4" />
                      example.ts
                    </span>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      onClick={copyCode}
                      className="p-1 rounded hover:bg-secondary/50 transition-colors"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4 text-neon-green" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </motion.button>
                  </div>
                  <pre className="bg-deep-black rounded-b-lg p-4 overflow-x-auto">
                    <code className="text-sm text-neon-green font-mono whitespace-pre">
                      {codeExample}
                    </code>
                  </pre>
                </div>
                <h2
                  className="text-2xl font-bold mt-8 mb-4 text-foreground"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Key Features
                </h2>
                <ul className="space-y-3 mb-8">
                  {[
                    "Lightning-fast performance with optimized algorithms",
                    "Enterprise-grade security with end-to-end encryption",
                    "Seamless integration with existing workflows",
                    "Real-time analytics and monitoring dashboard",
                    "24/7 premium support from our expert team",
                  ].map((feature, index) => (
                    <motion.li
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.1,
                      }}
                      className="flex items-start gap-3"
                      key={index}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-neon-blue mb-2">Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    For optimal performance, ensure your environment meets the
                    minimum system requirements before proceeding with the
                    installation.
                  </p>
                </div>
                <h2
                  className="text-2xl font-bold mt-8 mb-4 text-foreground"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Next Steps
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Now that you understand the basics, proceed to the
                  Installation guide to set up VIPER ELITE in your environment.
                  For advanced use cases, check out our API Reference and
                  Examples sections.
                </p>
              </div>
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/50">
                <div />
                <motion.button
                  whileHover={{
                    x: 5,
                  }}
                  className="flex items-center gap-2 text-neon-blue hover:text-neon-green transition-colors"
                >
                  <span>Quick Start Guide</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </GlassCard>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
