"use client";

import { motion } from "framer-motion";
export function ViperLogo({ className = "", animated = true }) {
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };
  const shimmerVariants = {
    initial: {
      backgroundPosition: "-200% center",
    },
    animate: {
      backgroundPosition: "200% center",
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  const textStyle = {
    background:
      "linear-gradient(90deg, #D4AF37 0%, #F5D67B 25%, #D4AF37 50%, #B8962F 75%, #D4AF37 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center gap-4 md:gap-6 mb-2">
        <motion.div
          className="flex items-center"
          initial="hidden"
          animate="visible"
        >
          {["V", ".", "I", ".", "P", ".", "E", ".", "R"].map((char, i) => (
            <motion.span
              custom={i}
              variants={letterVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.15em]"
              style={{
                ...textStyle,
                fontFamily: "var(--font-display)",
              }}
              key={i}
            >
              {animated ? (
                <motion.span
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={textStyle}
                >
                  {char}
                </motion.span>
              ) : (
                char
              )}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: -180,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative"
        >
          <svg
            viewBox="0 0 60 40"
            className="w-12 h-8 md:w-16 md:h-10 lg:w-20 lg:h-12"
            fill="none"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F5D67B" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            <motion.path
              d="M10 20 \n                 C10 10, 20 10, 25 15 \n                 C30 20, 30 25, 35 25\n                 C40 25, 45 20, 50 20\n                 C55 20, 55 25, 50 28\n                 C45 31, 40 28, 35 25\n                 M25 15\n                 C30 10, 35 10, 40 15\n                 C45 20, 50 15, 50 10"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              filter="url(#glow)"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
                delay: 0.8,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M20 22 Q25 18, 30 22 Q35 26, 40 22"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              filter="url(#glow)"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 1.2,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="30"
              cy="12"
              r="5"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#glow)"
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 1.5,
              }}
            />
          </svg>
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              boxShadow: [
                "0 0 20px rgba(212, 175, 55, 0.3)",
                "0 0 40px rgba(212, 175, 55, 0.5)",
                "0 0 20px rgba(212, 175, 55, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
        <motion.div
          className="flex items-center"
          initial="hidden"
          animate="visible"
        >
          {["E", "L", "I", "T", "E"].map((char, i) => (
            <motion.span
              custom={i + 10}
              variants={letterVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.1em]"
              style={{
                ...textStyle,
                fontFamily: "var(--font-display)",
              }}
              key={i}
            >
              {animated ? (
                <motion.span
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  style={textStyle}
                >
                  {char}
                </motion.span>
              ) : (
                char
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-4"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.6,
        }}
        className="flex items-center gap-2"
      >
        <motion.h2
          className="text-xl md:text-3xl lg:text-4xl font-bold tracking-[0.2em]"
          style={{
            ...textStyle,
            fontFamily: "var(--font-display)",
          }}
          animate={{
            textShadow: [
              "0 0 20px rgba(212, 175, 55, 0.3)",
              "0 0 40px rgba(212, 175, 55, 0.5)",
              "0 0 20px rgba(212, 175, 55, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          DOMINA ET VINCE
        </motion.h2>
      </motion.div>
    </div>
  );
}
