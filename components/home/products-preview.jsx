"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { OrganicButton } from "@/components/ui/organic-button";
import Link from "next/link";
import { BookOpen, Box, Users, Clock, Star } from "lucide-react";
const products = [
  {
    id: 1,
    name: "MASTERY COURSE",
    category: "courses",
    price: "$497",
    description: "Complete 3D modeling masterclass with 50+ hours of content",
    gradient: "from-neon-blue to-blue-600",
    icon: BookOpen,
    badge: "Bestseller",
    students: "2.4k",
    rating: 4.9,
    duration: "50h",
  },
  {
    id: 2,
    name: "VIPER MECH",
    category: "models",
    price: "$199",
    description: "High-detail mech warrior model, fully rigged and animated",
    gradient: "from-neon-green to-emerald-600",
    icon: Box,
    badge: "New",
    polygons: "250k",
    format: "FBX/OBJ",
  },
  {
    id: 3,
    name: "ELITE BUNDLE",
    category: "bundles",
    price: "$899",
    description: "Complete course collection + all 3D models pack",
    gradient: "from-gold to-amber-600",
    icon: Star,
    badge: "Best Value",
    includes: "15 items",
    savings: "40%",
  },
];
export function ProductsPreview() {
  const { t } = useLanguage();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Premium Collection"
          title="Courses & 3D Models"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {products.map((product, index) => (
            <motion.div
              variants={itemVariants}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              key={product.id}
            >
              <GlassCard
                glowColor={
                  index === 0 ? "blue" : index === 1 ? "green" : "gold"
                }
                className="h-full group relative overflow-hidden"
              >
                {product.badge && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.badge === "Bestseller" ? "bg-neon-blue text-deep-black" : product.badge === "New" ? "bg-neon-green text-deep-black" : "bg-gold text-deep-black"}`}
                  >
                    {product.badge}
                  </motion.span>
                )}
                <div
                  className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${product.gradient} mb-6 relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                      rotate: hoveredProduct === product.id ? 5 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <product.icon
                      className="w-20 h-20 text-deep-black/30"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  {hoveredProduct === product.id && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          className="absolute w-2 h-2 rounded-full bg-white/50"
                          initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                          }}
                          animate={{
                            x: `${30 + Math.random() * 40}%`,
                            y: `${30 + Math.random() * 40}%`,
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                          key={i}
                        />
                      ))}
                    </>
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                    initial={{
                      x: "-100%",
                      opacity: 0,
                    }}
                    animate={{
                      x: hoveredProduct === product.id ? "100%" : "-100%",
                      opacity: hoveredProduct === product.id ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      boxShadow: "inset 0 -20px 40px rgba(0,0,0,0.3)",
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <product.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {product.category}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 min-h-[40px]">
                  {product.description}
                </p>
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  {product.students && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {product.students} students
                    </span>
                  )}
                  {product.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {product.duration}
                    </span>
                  )}
                  {product.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-gold text-gold" />
                      {product.rating}
                    </span>
                  )}
                  {product.polygons && <span>{product.polygons} polys</span>}
                  {product.format && <span>{product.format}</span>}
                  {product.includes && <span>{product.includes}</span>}
                  {product.savings && (
                    <span className="text-neon-green">
                      Save {product.savings}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gold">
                    {product.price}
                  </span>
                  <motion.span
                    whileHover={{
                      x: 5,
                    }}
                    className="text-sm text-neon-blue hover:text-neon-green cursor-pointer transition-colors"
                  >
                    View Details →
                  </motion.span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
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
          className="text-center"
        >
          <Link href="/products">
            <OrganicButton variant="outline" size="lg" showArrow>
              Browse All Products
            </OrganicButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
