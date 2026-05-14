"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
const testimonials = [
  {
    quote:
      "VIPER ELITE has completely transformed how we approach technology. Their products are simply unmatched in quality and performance.",
    author: "James Morrison",
    role: "Tech Director, Fortune 500",
    rating: 5,
  },
  {
    quote:
      "The attention to detail and premium feel of every product is extraordinary. This is what elite technology should be.",
    author: "Sarah Chen",
    role: "CEO, Innovation Labs",
    rating: 5,
  },
  {
    quote:
      "Working with VIPER ELITE was a game-changer for our organization. The results speak for themselves.",
    author: "Michael Torres",
    role: "CTO, Global Dynamics",
    rating: 5,
  },
  {
    quote:
      "Exceptional quality, unparalleled support, and products that truly deliver on their promises. Highly recommended.",
    author: "Emma Williams",
    role: "Director, Tech Ventures",
    rating: 5,
  },
];
export function TestimonialsSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={t.testimonials.subtitle}
          title={t.testimonials.title}
        />
        <div className="relative">
          <GlassCard glowColor="blue" hover={false} className="min-h-[300px]">
            <Quote className="w-12 h-12 text-neon-blue/30 mb-6" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                key={current}
              >
                <p className="text-xl md:text-2xl text-foreground/90 mb-8 leading-relaxed">
                  “{testimonials[current].quote}”
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center">
                    <span className="text-sm font-bold text-deep-black">
                      {testimonials[current].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {testimonials[current].author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-6 right-6 flex items-center gap-2">
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={prev}
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={next}
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </GlassCard>
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${index === current ? "bg-neon-blue" : "bg-muted-foreground/30"}`}
                whileHover={{
                  scale: 1.2,
                }}
                aria-label={`Go to testimonial ${index + 1}`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
