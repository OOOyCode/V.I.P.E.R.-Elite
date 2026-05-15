
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Rocket, Target, Zap, Shield, Users, Globe } from "lucide-react";
const timelineEvents = [
  {
    year: "2018",
    title: "Founded",
    description: "VIPER ELITE was born with a vision to revolutionize tech.",
  },
  {
    year: "2019",
    title: "First Product",
    description: "Launched our flagship product to critical acclaim.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Expanded operations to 50+ countries worldwide.",
  },
  {
    year: "2021",
    title: "Innovation Award",
    description: "Received the prestigious Global Innovation Award.",
  },
  {
    year: "2022",
    title: "10K Clients",
    description: "Reached milestone of 10,000 enterprise clients.",
  },
  {
    year: "2023",
    title: "Elite Status",
    description: "Recognized as industry leader in premium tech.",
  },
  {
    year: "2024",
    title: "Next Chapter",
    description: "Continuing to push boundaries of innovation.",
  },
];
const values = [
  {
    icon: Rocket,
    title: "Innovation",
    description: "Pioneering solutions that shape the future",
    gradient: "from-neon-blue to-neon-blue/50",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Meticulous attention to every detail",
    gradient: "from-neon-green to-neon-green/50",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Uncompromising speed and efficiency",
    gradient: "from-gold to-gold/50",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Enterprise-grade protection always",
    gradient: "from-neon-blue to-neon-green",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building together, growing together",
    gradient: "from-neon-green to-gold",
  },
  {
    icon: Globe,
    title: "Global",
    description: "Worldwide reach, local excellence",
    gradient: "from-gold to-neon-blue",
  },
];
const teamMembers = [
  {
    name: "Alexander Steele",
    role: "CEO & Founder",
    bio: "Visionary leader with 20+ years in tech innovation.",
    initials: "AS",
    gradient: "from-neon-blue to-neon-blue/50",
  },
  {
    name: "Victoria Chen",
    role: "Chief Technology Officer",
    bio: "Former Google engineer, AI specialist.",
    initials: "VC",
    gradient: "from-neon-green to-neon-green/50",
  },
  {
    name: "Marcus Reyes",
    role: "Head of Design",
    bio: "Award-winning designer, Apple alumni.",
    initials: "MR",
    gradient: "from-gold to-gold/50",
  },
  {
    name: "Elena Volkov",
    role: "VP of Engineering",
    bio: "Systems architect, performance optimization expert.",
    initials: "EV",
    gradient: "from-neon-blue to-neon-green",
  },
  {
    name: "David Kim",
    role: "Chief Marketing Officer",
    bio: "Brand strategist with global campaign experience.",
    initials: "DK",
    gradient: "from-neon-green to-gold",
  },
  {
    name: "Sophia Martinez",
    role: "Head of Operations",
    bio: "Operations excellence, scaling specialist.",
    initials: "SM",
    gradient: "from-gold to-neon-blue",
  },
];
export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="pt-24">
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-green/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block text-sm tracking-[0.3em] uppercase text-neon-blue mb-4">
              {t.about.subtitle}
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {t.about.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.about.story}
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-neon-green mb-4 block">
                {t.about.mission.title}
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                }}
              >
                Empowering Excellence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.mission.description}
              </p>
            </div>
            <div className="relative">
              <GlassCard
                glowColor="blue"
                hover={false}
                className="relative overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-neon-blue/20 via-neon-green/10 to-gold/20 rounded-lg flex items-center justify-center">
                  <motion.span
                    className="text-7xl md:text-8xl font-bold text-foreground/10"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    VE
                  </motion.span>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="Core Values" title="What Drives Us" />
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              staggerChildren: 0.1,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                key={value.title}
              >
                <GlassCard
                  glowColor={
                    index % 3 === 0
                      ? "blue"
                      : index % 3 === 1
                        ? "green"
                        : "gold"
                  }
                  className="h-full"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4`}
                  >
                    <value.icon className="w-6 h-6 text-deep-black" />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle={t.about.timeline.title}
            title="Our Journey"
          />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-blue via-neon-green to-gold" />
            {timelineEvents.map((event, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                key={event.year}
              >
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <GlassCard
                    glowColor={
                      index % 3 === 0
                        ? "blue"
                        : index % 3 === 1
                          ? "green"
                          : "gold"
                    }
                  >
                    <span className="text-2xl font-bold text-neon-blue">
                      {event.year}
                    </span>
                    <h3
                      className="text-xl font-bold mt-2 mb-2"
                      style={{
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </GlassCard>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-green border-4 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle="Leadership" title="Meet The Team" />
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                key={member.name}
              >
                <GlassCard
                  glowColor={
                    index % 3 === 0
                      ? "blue"
                      : index % 3 === 1
                        ? "green"
                        : "gold"
                  }
                  className="text-center"
                >
                  <div
                    className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}
                  >
                    <span
                      className="text-2xl font-bold text-deep-black"
                      style={{
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {member.initials}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm text-neon-blue mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
