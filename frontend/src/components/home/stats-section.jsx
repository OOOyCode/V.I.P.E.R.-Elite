
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Users, Package, Globe, Trophy } from "lucide-react";
const stats = [
  {
    key: "clients",
    value: 15000,
    suffix: "+",
    icon: Users,
    gradient: "from-neon-blue to-neon-blue/50",
  },
  {
    key: "products",
    value: 50,
    suffix: "+",
    icon: Package,
    gradient: "from-neon-green to-neon-green/50",
  },
  {
    key: "countries",
    value: 120,
    suffix: "+",
    icon: Globe,
    gradient: "from-gold to-gold/50",
  },
  {
    key: "awards",
    value: 85,
    suffix: "+",
    icon: Trophy,
    gradient: "from-neon-blue to-neon-green",
  },
];
export function StatsSection() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-green/5" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t.stats.title} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                variants={itemVariants}
                className="text-center"
                key={stat.key}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  className="glass rounded-2xl p-6 md:p-8"
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7 text-deep-black" />
                  </div>
                  <div
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-foreground"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {t.stats[stat.key]}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
