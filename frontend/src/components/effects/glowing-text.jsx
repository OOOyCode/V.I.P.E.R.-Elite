
import { motion } from "framer-motion";
export function GlowingText({
  text,
  className,
  glowColor = "blue",
  animated = true,
}) {
  const glowStyles = {
    blue: {
      color: "var(--neon-blue)",
      textShadow:
        "0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue), 0 0 40px var(--neon-blue)",
    },
    green: {
      color: "var(--neon-green)",
      textShadow:
        "0 0 10px var(--neon-green), 0 0 20px var(--neon-green), 0 0 40px var(--neon-green)",
    },
    gold: {
      color: "var(--gold)",
      textShadow:
        "0 0 10px var(--gold), 0 0 20px var(--gold), 0 0 40px var(--gold)",
    },
    gradient: {
      backgroundImage:
        "linear-gradient(90deg, var(--neon-blue), var(--neon-green), var(--gold))",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
  };
  if (animated) {
    return (
      <motion.span
        className={className}
        style={glowStyles[glowColor]}
        animate={
          glowColor !== "gradient"
            ? {
                textShadow: [
                  `0 0 10px var(--neon-${glowColor === "gold" ? "gold" : glowColor}), 0 0 20px var(--neon-${glowColor === "gold" ? "gold" : glowColor})`,
                  `0 0 20px var(--neon-${glowColor === "gold" ? "gold" : glowColor}), 0 0 40px var(--neon-${glowColor === "gold" ? "gold" : glowColor})`,
                  `0 0 10px var(--neon-${glowColor === "gold" ? "gold" : glowColor}), 0 0 20px var(--neon-${glowColor === "gold" ? "gold" : glowColor})`,
                ],
              }
            : undefined
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    );
  }
  return (
    <span className={className} style={glowStyles[glowColor]}>
      {text}
    </span>
  );
}
