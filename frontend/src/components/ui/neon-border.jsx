
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function NeonBorder({
  children,
  className,
  color = "blue",
  animated = true,
}) {
  const borderClasses = {
    blue: "border-neon-blue shadow-[0_0_15px_rgba(59,130,246,0.5),inset_0_0_15px_rgba(59,130,246,0.1)]",
    green:
      "border-neon-green shadow-[0_0_15px_rgba(16,185,129,0.5),inset_0_0_15px_rgba(16,185,129,0.1)]",
    gold: "border-gold shadow-[0_0_15px_rgba(212,175,55,0.5),inset_0_0_15px_rgba(212,175,55,0.1)]",
    gradient: "",
  };
  if (color === "gradient") {
    return (
      <div className={cn("relative", className)}>
        <motion.div
          className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-neon-blue via-neon-green to-gold opacity-75"
          animate={
            animated
              ? {
                  opacity: [0.5, 0.8, 0.5],
                }
              : undefined
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="relative bg-background rounded-xl">{children}</div>
      </div>
    );
  }
  return (
    <motion.div
      className={cn("border-2 rounded-xl", borderClasses[color], className)}
      animate={
        animated
          ? {
              boxShadow: [
                `0 0 15px var(--neon-${color === "gold" ? "gold" : color})`,
                `0 0 30px var(--neon-${color === "gold" ? "gold" : color})`,
                `0 0 15px var(--neon-${color === "gold" ? "gold" : color})`,
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
      {children}
    </motion.div>
  );
}
