"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export function ParticleBackground() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const colors = [
      "rgba(59, 130, 246, 0.3)",
      // Blue
      "rgba(16, 185, 129, 0.3)",
      // Green
      "rgba(212, 175, 55, 0.2)", // Gold
    ];
    const newParticles = Array.from(
      {
        length: 50,
      },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }),
    );
    setParticles(newParticles);
  }, []);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-green/10 rounded-full blur-3xl animate-glow-pulse"
          style={{
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-glow-pulse"
          style={{
            animationDelay: "2s",
          }}
        />
      </div>
      {particles.map((particle) => (
        <motion.div
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          key={particle.id}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
