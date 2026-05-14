"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function AnimatedGradient({ className, variant = "border" }) {
  if (variant === "line") {
    return (
      <motion.div
        className={cn(
          "h-[2px] bg-gradient-to-r from-neon-blue via-neon-green to-gold animate-gradient-shift",
          className,
        )}
      />
    );
  }
  if (variant === "background") {
    return (
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-green/20 to-gold/20 animate-gradient-shift opacity-50 blur-3xl",
          className,
        )}
      />
    );
  }
  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-inherit p-[1px] bg-gradient-to-r from-neon-blue via-neon-green to-gold animate-gradient-shift",
        className,
      )}
    >
      <div className="absolute inset-[1px] bg-background rounded-inherit" />
    </motion.div>
  );
}
