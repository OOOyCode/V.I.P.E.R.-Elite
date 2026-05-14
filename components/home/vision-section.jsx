"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Lightbulb, Target, Award, Sparkles } from "lucide-react";
const icons = [Lightbulb, Target, Award];
const glowColors = ["blue", "green", "gold"];
export function VisionSection() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader subtitle={t.vision.subtitle} title={t.vision.title} />
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-16"
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t.vision.description}
          </p>
          <motion.div
            className="flex items-center justify-center gap-2 mt-6"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold/70">
              Elite Standards
            </span>
            <Sparkles className="w-4 h-4 text-gold" />
          </motion.div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {t.vision.values.map((value, index) => {
            const Icon = icons[index];
            const gradients = [
              "from-neon-blue via-blue-500 to-cyan-500",
              "from-neon-green via-emerald-500 to-teal-500",
              "from-gold via-amber-500 to-orange-500",
            ];
            return (
              <motion.div variants={itemVariants} key={value.title}>
                <GlassCard
                  glowColor={glowColors[index]}
                  className="h-full group"
                >
                  <motion.div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-6`}
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      scale: 1.05,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <Icon className="w-8 h-8 text-deep-black" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/50"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white/30"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: index * 0.3 + 0.5,
                      }}
                    />
                  </motion.div>
                  <h3
                    className="text-xl font-bold mb-3 group-hover:text-gold transition-colors"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradients[index]} rounded-b-2xl`}
                    initial={{
                      width: "0%",
                    }}
                    whileHover={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
