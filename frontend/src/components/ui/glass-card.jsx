
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
export function GlassCard({
  children,
  className,
  glowColor = "blue",
  hover = true,
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [4, -4]);
  const rotateY = useTransform(mouseX, [-100, 100], [-4, 4]);
  const springRotateX = useSpring(rotateX, {
    stiffness: 300,
    damping: 30,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 300,
    damping: 30,
  });
  const handleMouseMove = (e) => {
    if (!cardRef.current || !hover) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  const glowClasses = {
    blue: "hover:shadow-[0_0_40px_rgba(59,130,246,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
    green:
      "hover:shadow-[0_0_40px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
    gold: "hover:shadow-[0_0_40px_rgba(212,175,55,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
  };
  const borderColors = {
    blue: "rgba(59, 130, 246, 0.3)",
    green: "rgba(16, 185, 129, 0.3)",
    gold: "rgba(212, 175, 55, 0.3)",
  };
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hover ? springRotateX : 0,
        rotateY: hover ? springRotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={
        hover
          ? {
              y: -8,
              scale: 1.01,
            }
          : undefined
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-500",
        hover && glowClasses[glowColor],
        className,
      )}
      initial={false}
    >
      <div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: "rgba(10, 12, 18, 0.7)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${borderColors[glowColor]}`,
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${borderColors[glowColor]} 0%, transparent 50%, ${borderColors[glowColor]} 100%)`,
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
        }}
      />
      <div
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
