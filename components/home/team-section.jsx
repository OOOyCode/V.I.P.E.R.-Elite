"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  Quote,
} from "lucide-react";
const teamMembers = [
  {
    id: 0,
    name: "Alexander Steele",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech innovation. Pioneering the future of digital education and 3D content creation.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    color: "#D4AF37",
    // Gold
    bgGradient: "from-amber-900/40 via-yellow-900/30 to-orange-900/20",
    projects: ["VIPER Academy", "Elite 3D Library", "Creator Pro Suite"],
    personalMessage:
      '"Innovation is not about ideas. It is about making ideas happen."',
    email: "alex@viperelite.com",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 1,
    name: "Victoria Chen",
    role: "CTO",
    bio: "AI & Machine Learning expert, former Google engineer. Building intelligent systems that empower creators worldwide.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    color: "#3B82F6",
    // Blue
    bgGradient: "from-blue-900/40 via-cyan-900/30 to-indigo-900/20",
    projects: [
      "AI Texture Generator",
      "Smart Render Engine",
      "Auto-Rigging Tool",
    ],
    personalMessage:
      '"Technology should amplify human creativity, not replace it."',
    email: "victoria@viperelite.com",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 2,
    name: "Marcus Reyes",
    role: "Head of Design",
    bio: "Award-winning designer, crafting premium visual experiences. 10+ years creating stunning 3D environments.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    color: "#22C55E",
    // Green
    bgGradient: "from-emerald-900/40 via-green-900/30 to-teal-900/20",
    projects: ["Design System 3.0", "UI Kit Pro", "Visual Identity Guidelines"],
    personalMessage: '"Great design is invisible. It just works."',
    email: "marcus@viperelite.com",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 3,
    name: "Elena Volkov",
    role: "VP of Engineering",
    bio: "Building scalable systems that power the future. Expert in distributed systems and real-time rendering.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    color: "#A855F7",
    // Purple
    bgGradient: "from-purple-900/40 via-violet-900/30 to-fuchsia-900/20",
    projects: ["Cloud Render Farm", "Real-time Collab", "Asset Pipeline 2.0"],
    personalMessage: '"Code is poetry. Architecture is art."',
    email: "elena@viperelite.com",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 4,
    name: "James Wright",
    role: "Lead 3D Artist",
    bio: "Master sculptor and texture artist with AAA game industry background. Creating assets that inspire.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    color: "#F97316",
    // Orange
    bgGradient: "from-orange-900/40 via-red-900/30 to-amber-900/20",
    projects: ["Character Collection", "Environment Pack", "Material Library"],
    personalMessage: '"Every polygon tells a story. Make it count."',
    email: "james@viperelite.com",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
];
// Typewriter effect component
function TypewriterText({ text, delay = 0, speed = 30 }) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    setDisplayText("");
    setIsTyping(false);
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);
  return (
    <span>
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
}
// Cursive handwriting effect for names
function CursiveText({ text, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return (
    <motion.span
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      className="relative inline-block"
    >
      <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none overflow-visible">
        <motion.path
          d="M 0 50 Q 25 20, 50 50 T 100 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold/30"
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: visible ? 1 : 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
      </svg>
      {text.split("").map((char, i) => (
        <motion.span
          initial={{
            opacity: 0,
            y: 20,
            rotateZ: -10,
          }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 20,
            rotateZ: visible ? 0 : -10,
          }}
          transition={{
            duration: 0.4,
            delay: visible ? i * 0.05 : 0,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block"
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
          }}
          key={i}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
export function TeamSection() {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const selectedMember = teamMembers[selectedIndex];
  const wheelRadius = 140; // Radius of the wheel
  const memberRadius = 50; // Size of each member circle
  const handleSelectMember = (index) => {
    setSelectedIndex(index);
  };
  // Calculate position for each member on the wheel
  const getMemberPosition = (index, total) => {
    // Offset so selected member is at top
    const angleOffset = -90; // Start from top
    const angleStep = 360 / total;
    const angle = angleOffset + angleStep * index - angleStep * selectedIndex;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * wheelRadius,
      y: Math.sin(radian) * wheelRadius,
    };
  };
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className={`absolute inset-0 bg-gradient-to-br ${selectedMember.bgGradient}`}
        key={selectedMember.id}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at 30% 50%, ${selectedMember.color}15 0%, transparent 50%)`,
        }}
        transition={{
          duration: 0.8,
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({
          length: 15,
        }).map((_, i) => (
          <motion.div
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: selectedMember.color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
            key={i}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-gold/80 mb-4 block">
            {t.team.subtitle}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground"
            style={{
              fontFamily: "var(--font-display)",
            }}
          >
            {t.team.title}
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            className="flex justify-center items-center"
          >
            <div
              className="relative"
              style={{
                width: (wheelRadius + memberRadius) * 2 + 40,
                height: (wheelRadius + memberRadius) * 2 + 40,
              }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2"
                style={{
                  borderColor: selectedMember.color,
                }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${selectedMember.color}40, inset 0 0 30px ${selectedMember.color}20`,
                    `0 0 40px ${selectedMember.color}60, inset 0 0 50px ${selectedMember.color}30`,
                    `0 0 20px ${selectedMember.color}40, inset 0 0 30px ${selectedMember.color}20`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div
                  className="absolute inset-4 rounded-full opacity-30"
                  style={{
                    backgroundColor: selectedMember.color,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{
                      color: selectedMember.color,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    VIPER
                  </span>
                </div>
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                style={{
                  width: wheelRadius * 2,
                  height: wheelRadius * 2,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {teamMembers.map((member, index) => {
                const pos = getMemberPosition(index, teamMembers.length);
                const isSelected = index === selectedIndex;
                const isHovered = index === hoveredIndex;
                return (
                  <motion.button
                    onClick={() => handleSelectMember(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="absolute top-1/2 left-1/2 rounded-full overflow-hidden cursor-pointer"
                    style={{
                      width: memberRadius * 2,
                      height: memberRadius * 2,
                    }}
                    animate={{
                      x: pos.x - memberRadius,
                      y: pos.y - memberRadius,
                      scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
                      zIndex: isSelected ? 10 : isHovered ? 5 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      mass: 1,
                    }}
                    whileHover={{
                      scale: isSelected ? 1.2 : 1.15,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    key={member.id}
                  >
                    <motion.div
                      className="absolute -inset-2 rounded-full"
                      animate={{
                        opacity: isSelected || isHovered ? 1 : 0.3,
                        scale: isSelected ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        opacity: {
                          duration: 0.3,
                        },
                        scale: {
                          duration: 2,
                          repeat: isSelected ? Infinity : 0,
                        },
                      }}
                      style={{
                        background: `radial-gradient(circle, ${member.color}60 0%, transparent 70%)`,
                        filter: "blur(8px)",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      animate={{
                        borderColor: isSelected
                          ? member.color
                          : `${member.color}50`,
                        boxShadow: isSelected
                          ? `0 0 20px ${member.color}80, inset 0 0 20px ${member.color}30`
                          : "none",
                      }}
                    />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-full"
                      initial={{
                        x: "-100%",
                        opacity: 0,
                      }}
                      animate={{
                        x: isHovered ? "100%" : "-100%",
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{
                opacity: 0,
                x: 50,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -50,
                scale: 0.95,
              }}
              transition={{
                duration: 0.5,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className="relative"
              key={selectedMember.id}
            >
              <div
                className="relative p-8 rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(10, 10, 15, 0.7)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${selectedMember.color}30`,
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      `inset 0 0 30px ${selectedMember.color}10, 0 0 20px ${selectedMember.color}10`,
                      `inset 0 0 50px ${selectedMember.color}20, 0 0 40px ${selectedMember.color}20`,
                      `inset 0 0 30px ${selectedMember.color}10, 0 0 20px ${selectedMember.color}10`,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-6">
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
                        delay: 0.1,
                        duration: 0.4,
                      }}
                      className="relative flex-shrink-0"
                    >
                      <motion.div
                        className="absolute -inset-3 rounded-2xl"
                        style={{
                          backgroundColor: selectedMember.color,
                        }}
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="relative w-24 h-24 rounded-2xl object-cover border-2"
                        style={{
                          borderColor: selectedMember.color,
                        }}
                      />
                    </motion.div>
                    <div className="flex-1 pt-2">
                      <h3
                        className="text-2xl md:text-3xl font-bold mb-2"
                        style={{
                          color: selectedMember.color,
                        }}
                      >
                        <CursiveText text={selectedMember.name} delay={200} />
                      </h3>
                      <motion.p
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.4,
                          duration: 0.4,
                        }}
                        className="text-lg text-muted-foreground"
                      >
                        {selectedMember.role}
                      </motion.p>
                    </div>
                  </div>
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    className="mb-6"
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      <TypewriterText
                        text={selectedMember.bio}
                        delay={600}
                        speed={20}
                      />
                    </p>
                  </motion.div>
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
                      delay: 1.2,
                    }}
                    className="mb-6 p-4 rounded-xl bg-white/5 border-l-2"
                    style={{
                      borderColor: selectedMember.color,
                    }}
                  >
                    <Quote
                      className="w-4 h-4 mb-2"
                      style={{
                        color: selectedMember.color,
                      }}
                    />
                    <p className="text-sm italic text-foreground/80">
                      {selectedMember.personalMessage}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 1.4,
                    }}
                    className="mb-6"
                  >
                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      Projects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.projects.map((project, i) => (
                        <motion.span
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 1.5 + i * 0.1,
                          }}
                          className="px-3 py-1 rounded-full text-sm border"
                          style={{
                            borderColor: `${selectedMember.color}50`,
                            color: selectedMember.color,
                            backgroundColor: `${selectedMember.color}10`,
                          }}
                          key={project}
                        >
                          {project}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
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
                      delay: 1.8,
                    }}
                    className="flex flex-wrap gap-3"
                  >
                    <motion.a
                      href={`mailto:${selectedMember.email}`}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
                      style={{
                        backgroundColor: `${selectedMember.color}20`,
                        color: selectedMember.color,
                        border: `1px solid ${selectedMember.color}30`,
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      Contact
                    </motion.a>
                    {[
                      {
                        icon: Twitter,
                        href: selectedMember.social.twitter,
                      },
                      {
                        icon: Linkedin,
                        href: selectedMember.social.linkedin,
                      },
                      {
                        icon: Github,
                        href: selectedMember.social.github,
                      },
                    ].map(({ icon: Icon, href }, i) => (
                      <motion.a
                        href={href}
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          boxShadow: `0 0 20px ${selectedMember.color}40`,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                        key={i}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                    <motion.a
                      href="#"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Portfolio
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
