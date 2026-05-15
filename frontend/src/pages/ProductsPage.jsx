
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { OrganicButton } from "@/components/ui/organic-button";
import {
  Search,
  Filter,
  BookOpen,
  Box,
  Star,
  Users,
  Clock,
  Play,
  Download,
} from "lucide-react";
const products = [
  // Courses
  {
    id: 1,
    name: "MASTERY COURSE",
    category: "courses",
    price: 497,
    description: "Complete 3D modeling masterclass - From beginner to pro",
    gradient: "from-neon-blue to-blue-600",
    badge: "Bestseller",
    icon: BookOpen,
    students: "2.4k",
    duration: "50h",
    rating: 4.9,
  },
  {
    id: 2,
    name: "BLENDER ELITE",
    category: "courses",
    price: 297,
    description: "Advanced Blender techniques for professionals",
    gradient: "from-neon-blue to-cyan-600",
    badge: null,
    icon: BookOpen,
    students: "1.8k",
    duration: "35h",
    rating: 4.8,
  },
  {
    id: 3,
    name: "TEXTURE PRO",
    category: "courses",
    price: 197,
    description: "Master PBR texturing and material creation",
    gradient: "from-blue-500 to-indigo-600",
    badge: "Popular",
    icon: BookOpen,
    students: "3.2k",
    duration: "25h",
    rating: 4.9,
  },
  // 3D Models
  {
    id: 4,
    name: "VIPER MECH",
    category: "models",
    price: 199,
    description: "High-detail mech warrior, fully rigged and animated",
    gradient: "from-neon-green to-emerald-600",
    badge: "New",
    icon: Box,
    polygons: "250k",
    format: "FBX/OBJ/BLEND",
  },
  {
    id: 5,
    name: "CYBER VEHICLE",
    category: "models",
    price: 149,
    description: "Futuristic vehicle pack with 5 unique designs",
    gradient: "from-emerald-500 to-teal-600",
    badge: null,
    icon: Box,
    polygons: "180k",
    format: "FBX/OBJ/BLEND",
  },
  {
    id: 6,
    name: "ELITE WEAPONS",
    category: "models",
    price: 89,
    description: "Sci-fi weapon collection - 12 detailed models",
    gradient: "from-teal-500 to-cyan-600",
    badge: "Sale",
    icon: Box,
    polygons: "120k",
    format: "FBX/OBJ/BLEND",
  },
  {
    id: 7,
    name: "ENVIRONMENT KIT",
    category: "models",
    price: 249,
    description: "Modular cyberpunk environment assets",
    gradient: "from-neon-green to-lime-600",
    badge: null,
    icon: Box,
    polygons: "500k+",
    format: "FBX/OBJ/BLEND",
  },
  // Bundles
  {
    id: 8,
    name: "ELITE BUNDLE",
    category: "bundles",
    price: 899,
    description: "All courses + all 3D models - Ultimate collection",
    gradient: "from-gold to-amber-600",
    badge: "Best Value",
    icon: Star,
    includes: "15 items",
    savings: "60%",
  },
  {
    id: 9,
    name: "STARTER PACK",
    category: "bundles",
    price: 399,
    description: "Perfect for beginners - 2 courses + 3 models",
    gradient: "from-amber-500 to-orange-600",
    badge: null,
    icon: Star,
    includes: "5 items",
    savings: "35%",
  },
];
const categories = ["all", "courses", "models", "bundles"];
export default function ProductsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const categoryLabels = {
    all: "All Products",
    courses: "Courses",
    models: "3D Models",
    bundles: "Bundles",
  };
  return (
    <div className="pt-24">
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-green/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Premium Collection"
            title="Courses & 3D Models"
          />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-neon-blue" />
              <input
                type="text"
                placeholder="Search courses & models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
                style={{
                  background: "rgba(10, 10, 15, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter className="w-5 h-5 text-muted-foreground mr-2 hidden sm:block" />
              {categories.map((category) => (
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all ${activeCategory === category ? "bg-gradient-to-r from-gold to-amber-600 text-deep-black font-bold shadow-lg shadow-gold/20" : "text-muted-foreground hover:text-foreground"}`}
                  style={
                    activeCategory !== category
                      ? {
                          background: "rgba(10, 10, 15, 0.6)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }
                      : {}
                  }
                  key={category}
                >
                  {categoryLabels[category]}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  key={product.id}
                >
                  <GlassCard
                    glowColor={
                      product.category === "courses"
                        ? "blue"
                        : product.category === "models"
                          ? "green"
                          : "gold"
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
                        className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.badge === "New" ? "bg-neon-green text-deep-black" : product.badge === "Bestseller" ? "bg-neon-blue text-deep-black" : product.badge === "Popular" ? "bg-neon-blue/80 text-deep-black" : product.badge === "Sale" ? "bg-red-500 text-white" : "bg-gold text-deep-black"}`}
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
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              className="absolute w-2 h-2 rounded-full bg-white/60"
                              initial={{
                                x: "50%",
                                y: "50%",
                                scale: 0,
                              }}
                              animate={{
                                x: `${20 + Math.random() * 60}%`,
                                y: `${20 + Math.random() * 60}%`,
                                scale: [0, 1.2, 0],
                              }}
                              transition={{
                                duration: 0.8,
                                delay: i * 0.08,
                                repeat: Infinity,
                                repeatDelay: 0.3,
                              }}
                              key={i}
                            />
                          ))}
                        </>
                      )}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent flex items-end justify-center pb-4"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        <OrganicButton variant="gold" size="sm">
                          {product.category === "courses" ? (
                            <>
                              <Play className="w-4 h-4 mr-1" /> Preview
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-1" /> Details
                            </>
                          )}
                        </OrganicButton>
                      </motion.div>
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          boxShadow: "inset 0 -30px 60px rgba(0,0,0,0.4)",
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <product.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {categoryLabels[product.category]}
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
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                      {product.students && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {product.students}
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
                      {product.polygons && (
                        <span className="bg-neon-green/10 px-2 py-0.5 rounded text-neon-green">
                          {product.polygons} polys
                        </span>
                      )}
                      {product.format && (
                        <span className="bg-white/5 px-2 py-0.5 rounded">
                          {product.format}
                        </span>
                      )}
                      {product.includes && (
                        <span className="bg-gold/10 px-2 py-0.5 rounded text-gold">
                          {product.includes}
                        </span>
                      )}
                      {product.savings && (
                        <span className="bg-neon-green/20 px-2 py-0.5 rounded text-neon-green font-medium">
                          Save {product.savings}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-2xl font-bold text-gold">
                        ${product.price}
                      </span>
                      <motion.span
                        whileHover={{
                          x: 5,
                        }}
                        className="text-sm text-neon-blue hover:text-neon-green cursor-pointer transition-colors flex items-center gap-1"
                      >
                        Learn More <span>â†’</span>
                      </motion.span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="text-center py-20"
            >
              <Box className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-xl text-muted-foreground">
                No products found matching your criteria.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Try adjusting your search or filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
