
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
export function OrganicButton({
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow = false,
  onClick,
  type = "button",
}) {
  const buttonRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);
  const springRotateX = useSpring(rotateX, {
    stiffness: 300,
    damping: 30,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 300,
    damping: 30,
  });
  const colors = {
    primary: ["#3b82f6", "#60a5fa", "#93c5fd"],
    secondary: ["#10b981", "#34d399", "#6ee7b7"],
    outline: ["#3b82f6", "#10b981", "#d4af37"],
    gold: ["#d4af37", "#fbbf24", "#f59e0b"],
  };
  const createParticle = useCallback(
    (x, y, burst = false) => {
      const count = burst ? 12 : 3;
      const newParticles = [];
      for (let i = 0; i < count; i++) {
        const angle = burst
          ? (Math.PI * 2 * i) / count
          : Math.random() * Math.PI * 2;
        const speed = burst ? 3 + Math.random() * 3 : 1 + Math.random() * 2;
        newParticles.push({
          id: Date.now() + i,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: burst ? 4 + Math.random() * 4 : 2 + Math.random() * 3,
          color:
            colors[variant][Math.floor(Math.random() * colors[variant].length)],
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);
    },
    [variant],
  );
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
            life: p.life - 0.03,
          }))
          .filter((p) => p.life > 0),
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles.length]);
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    if (isHovered && Math.random() > 0.7) {
      createParticle(e.clientX - rect.left, e.clientY - rect.top);
    }
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  const handleClick = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    createParticle(e.clientX - rect.left, e.clientY - rect.top, true);
    onClick?.();
  };
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase overflow-visible";
  const variantClasses = {
    primary:
      "bg-gradient-to-br from-neon-blue via-neon-blue to-blue-600 text-white",
    secondary:
      "bg-gradient-to-br from-neon-green via-emerald-500 to-teal-600 text-deep-black",
    outline: "bg-transparent border-2 border-neon-blue/60 text-foreground",
    gold: "bg-gradient-to-br from-gold via-amber-500 to-yellow-600 text-deep-black",
  };
  const sizeClasses = {
    sm: "px-5 py-2.5 text-xs rounded-xl",
    md: "px-7 py-3.5 text-sm rounded-2xl",
    lg: "px-10 py-5 text-base rounded-2xl",
  };
  const glowColors = {
    primary: "shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)]",
    secondary: "shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]",
    outline: "shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)]",
    gold: "shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)]",
  };
  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        y: isPressed ? 2 : isHovered ? -4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        isHovered && glowColors[variant],
        "transition-shadow duration-300",
        className,
      )}
    >
      <motion.span
        className="absolute inset-0 rounded-inherit bg-gradient-to-t from-black/20 to-white/20 pointer-events-none"
        style={{
          transform: "translateZ(1px)",
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0.5,
        }}
      />
      <motion.span
        className="absolute inset-[2px] rounded-inherit pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50}% ${50}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          transform: "translateZ(2px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />
      <motion.span
        className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none"
        style={{
          transform: "translateZ(3px)",
        }}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{
            x: "-100%",
          }}
          animate={
            isHovered
              ? {
                  x: "100%",
                }
              : {
                  x: "-100%",
                }
          }
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        />
      </motion.span>
      <motion.span
        className="absolute -inset-1 rounded-inherit pointer-events-none"
        style={{
          background:
            variant === "outline"
              ? "linear-gradient(45deg, rgba(59,130,246,0.3), rgba(16,185,129,0.3))"
              : "transparent",
          filter: "blur(8px)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span
        className="relative z-10 flex items-center gap-2"
        style={{
          transform: "translateZ(4px)",
        }}
      >
        {children}
        {showArrow && (
          <motion.span
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        )}
      </span>
      {particles.map((particle) => (
        <motion.span
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: "translateZ(10px)",
          }}
          key={particle.id}
        />
      ))}
    </motion.button>
  );
}
