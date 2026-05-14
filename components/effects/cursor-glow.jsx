"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsVisible(true);
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 150,
        y: mousePosition.y - 150,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    >
      <div className="w-[300px] h-[300px] rounded-full bg-gradient-radial from-neon-blue/20 via-neon-blue/5 to-transparent blur-xl" />
    </motion.div>
  );
}
