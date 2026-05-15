
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
export function GlowButton({
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow = false,
  onClick,
  type = "button",
}) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 font-medium tracking-wide uppercase transition-all duration-300 overflow-hidden group";
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-neon-blue to-neon-green text-deep-black hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    outline:
      "border-2 border-neon-blue/50 text-foreground hover:border-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-xs rounded-lg",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-xl",
  };
  return (
    <motion.button
      type={type}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <motion.span
          className="relative z-10"
          initial={{
            x: 0,
          }}
          whileHover={{
            x: 3,
          }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </motion.button>
  );
}
