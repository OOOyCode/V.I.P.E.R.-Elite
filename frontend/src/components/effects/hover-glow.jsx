
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function HoverGlow({
  children,
  className,
  glowColor = "blue",
  intensity = "medium",
}) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const glowColors = {
    blue: "rgba(59, 130, 246, VAR)",
    green: "rgba(16, 185, 129, VAR)",
    gold: "rgba(212, 175, 55, VAR)",
  };
  const intensityValues = {
    low: 0.15,
    medium: 0.25,
    high: 0.4,
  };
  const color = glowColors[glowColor].replace(
    "VAR",
    intensityValues[intensity].toString(),
  );
  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        className="absolute pointer-events-none z-0"
        animate={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
