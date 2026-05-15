
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
export function LivingBackground() {
  const [orbs, setOrbs] = useState([]);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const { scrollYProgress } = useScroll();
  // Dynamic colors based on scroll position
  const hue1 = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [220, 180, 145, 85, 220],
  );
  const hue2 = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [145, 220, 85, 180, 145],
  );
  const [currentHue1, setCurrentHue1] = useState(220);
  const [currentHue2, setCurrentHue2] = useState(145);
  useEffect(() => {
    const unsubscribe1 = hue1.on("change", (v) => setCurrentHue1(v));
    const unsubscribe2 = hue2.on("change", (v) => setCurrentHue2(v));
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [hue1, hue2]);
  useEffect(() => {
    const newOrbs = [
      {
        id: 1,
        x: 20,
        y: 30,
        size: 400,
        color: "neon-blue",
        targetX: 25,
        targetY: 35,
      },
      {
        id: 2,
        x: 70,
        y: 60,
        size: 350,
        color: "neon-green",
        targetX: 65,
        targetY: 55,
      },
      {
        id: 3,
        x: 50,
        y: 80,
        size: 300,
        color: "gold",
        targetX: 55,
        targetY: 75,
      },
      {
        id: 4,
        x: 80,
        y: 20,
        size: 250,
        color: "neon-blue",
        targetX: 75,
        targetY: 25,
      },
    ];
    setOrbs(newOrbs);
  }, []);
  // Animate orbs toward mouse with organic movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // Animate orbs
  useEffect(() => {
    let animationId;
    const animateOrbs = () => {
      setOrbs((prev) =>
        prev.map((orb, i) => {
          // Create organic floating movement
          const time = Date.now() * 0.001;
          const offsetX = Math.sin(time * 0.5 + i) * 5;
          const offsetY = Math.cos(time * 0.3 + i * 2) * 5;
          // Subtle attraction to mouse
          const mouseInfluence = 0.02;
          const targetX =
            orb.targetX + offsetX + (mousePos.x - orb.x) * mouseInfluence;
          const targetY =
            orb.targetY + offsetY + (mousePos.y - orb.y) * mouseInfluence;
          return {
            ...orb,
            x: orb.x + (targetX - orb.x) * 0.01,
            y: orb.y + (targetY - orb.y) * 0.01,
          };
        }),
      );
      animationId = requestAnimationFrame(animateOrbs);
    };
    animationId = requestAnimationFrame(animateOrbs);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);
  const getOrbColor = (color) => {
    switch (color) {
      case "neon-blue":
        return `oklch(0.65 0.2 ${currentHue1})`;
      case "neon-green":
        return `oklch(0.75 0.25 ${currentHue2})`;
      case "gold":
        return `oklch(0.75 0.12 85)`;
      default:
        return color;
    }
  };
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.65 0.15 ${currentHue1} / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 30% 70%, oklch(0.75 0.2 ${currentHue2} / 0.06) 0%, transparent 40%),
            linear-gradient(180deg, var(--background) 0%, var(--background) 100%)
          `,
        }}
      />
      {orbs.map((orb) => (
        <motion.div
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${getOrbColor(orb.color)} 0%, transparent 70%)`,
            filter: "blur(60px)",
            opacity: 0.4,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4 + orb.id,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          key={orb.id}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, oklch(0.65 0.2 ${currentHue1}) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, oklch(0.75 0.25 ${currentHue2}) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, oklch(0.75 0.12 85) 0%, transparent 40%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.65 0.2 ${currentHue1} / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.65 0.2 ${currentHue1} / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--background) 100%)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
