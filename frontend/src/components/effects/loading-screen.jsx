
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-0 bg-gradient-conic from-neon-blue via-neon-green to-neon-blue rounded-full opacity-20 blur-3xl" />
            </motion.div>
          </div>
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative z-10 mb-12"
          >
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-4xl md:text-6xl font-bold tracking-[0.3em] text-gold"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              VIPER ELITE
            </motion.div>
          </motion.div>
          <div className="relative z-10 w-64 md:w-80">
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-green to-neon-blue"
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${Math.min(progress, 100)}%`,
                }}
                transition={{
                  duration: 0.1,
                }}
              />
            </div>
            <motion.div
              className="mt-4 text-center text-sm text-muted-foreground tracking-widest"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              INITIALIZING...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
