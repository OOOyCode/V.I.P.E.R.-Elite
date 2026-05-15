
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { OrganicButton } from "@/components/ui/organic-button";
import { Link } from "react-router-dom";
import { useRef } from "react";
export function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  const springRotateX = useSpring(rotateX, {
    stiffness: 100,
    damping: 30,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 100,
    damping: 30,
  });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-gold/20 via-transparent to-transparent rounded-full blur-3xl" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 border border-gold/20 rounded-full" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[550px] md:h-[550px]"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 border border-neon-blue/15 rounded-full" />
        </motion.div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          className="mb-8"
        >
          <motion.div
            className="relative inline-block mb-4"
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))",
                "drop-shadow(0 0 40px rgba(212, 175, 55, 0.5))",
                "drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%27%C3%A9cran%202026-05-14%20232759-5F3ySS3zzVgJl4XvtlCDEnwK6vakBX.png"
              alt="VIPER ELITE Logo"
              className="w-full max-w-xl mx-auto h-auto"
            />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] text-gold sr-only"
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            VIPER ELITE
          </motion.h1>
        </motion.div>
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: "200px",
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
        />
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="text-lg md:text-xl text-muted-foreground mb-4"
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.7,
          }}
          className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12"
        >
          Premium 3D models & expert courses for elite creators. Master the art
          of digital creation.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.9,
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/products">
            <OrganicButton variant="gold" size="lg" showArrow>
              Explore Collection
            </OrganicButton>
          </Link>
          <Link to="/about">
            <OrganicButton variant="outline" size="lg">
              Our Story
            </OrganicButton>
          </Link>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-6 h-10 border-2 border-gold/50 rounded-full p-1"
          >
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-2 h-2 bg-gold rounded-full mx-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
