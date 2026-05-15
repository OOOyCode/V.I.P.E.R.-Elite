
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
const navItems = [
  {
    key: "home",
    href: "/",
  },
  {
    key: "about",
    href: "/about",
  },
  {
    key: "products",
    href: "/products",
  },
  {
    key: "docs",
    href: "/docs",
  },
  {
    key: "contact",
    href: "/contact",
  },
];
const languages = [
  {
    code: "en",
    label: "EN",
  },
  {
    code: "fr",
    label: "FR",
  },
  {
    code: "es",
    label: "ES",
  },
];
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { locale, setLocale, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  // Navbar breathing animation based on scroll
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0.7, 0.95]);
  const navBlur = useTransform(scrollYProgress, [0, 0.1], [16, 24]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          className={`mx-4 mt-4 rounded-2xl transition-all duration-500 ${isScrolled ? "py-3" : "py-4"}`}
          style={{
            background: `rgba(10, 10, 15, ${isScrolled ? 0.8 : 0.6})`,
            backdropFilter: `blur(${isScrolled ? 24 : 16}px)`,
            border: "1px solid rgba(59, 130, 246, 0.15)",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
              : "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
          animate={{
            borderColor: isScrolled
              ? "rgba(59, 130, 246, 0.25)"
              : "rgba(59, 130, 246, 0.15)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(16,185,129,0.2) 50%, rgba(212,175,55,0.2) 100%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "xor",
                padding: "1px",
              }}
            />
          </motion.div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link to="/" className="group relative">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(212, 175, 55, 0.3)",
                        "0 0 30px rgba(212, 175, 55, 0.5)",
                        "0 0 20px rgba(212, 175, 55, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <span
                      className="text-deep-black font-bold text-lg"
                      style={{
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      V
                    </span>
                  </motion.div>
                  <motion.span
                    className="text-lg md:text-xl font-bold tracking-[0.15em] text-gold hidden sm:block"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    IPER ELITE
                  </motion.span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-gold via-neon-blue to-neon-green"
                  initial={{
                    width: 0,
                  }}
                  whileHover={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                />
              </Link>
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    to={item.href}
                    className="relative group px-4 py-2"
                    key={item.key}
                  >
                    <motion.span
                      className={`text-sm tracking-wider uppercase transition-colors relative z-10 ${pathname === item.href ? "text-gold" : "text-foreground/70 group-hover:text-foreground"}`}
                      whileHover={{
                        y: -2,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                      }}
                    >
                      {t.nav[item.key]}
                    </motion.span>
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-gold/10 rounded-xl border border-gold/20"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)",
                      }}
                    />
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="uppercase hidden sm:inline">{locale}</span>
                  </motion.button>
                  <AnimatePresence>
                    {isLangMenuOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="absolute top-full right-0 mt-2 py-2 rounded-xl min-w-[100px] overflow-hidden"
                        style={{
                          background: "rgba(10, 10, 15, 0.9)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                        }}
                      >
                        {languages.map((lang) => (
                          <motion.button
                            onClick={() => {
                              setLocale(lang.code);
                              setIsLangMenuOpen(false);
                            }}
                            whileHover={{
                              x: 4,
                              backgroundColor: "rgba(255,255,255,0.05)",
                            }}
                            className={`w-full px-4 py-2 text-left text-sm transition-colors ${locale === lang.code ? "text-gold" : "text-foreground/70"}`}
                            key={lang.code}
                          >
                            {lang.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    rotate: 180,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={toggleTheme}
                  className="p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "rgba(5, 5, 10, 0.98)",
                backdropFilter: "blur(24px)",
              }}
            />
            <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
              {navItems.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  key={item.key}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-3xl md:text-4xl tracking-wider uppercase relative group ${pathname === item.href ? "text-gold" : "text-foreground/70 hover:text-foreground"}`}
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {t.nav[item.key]}
                    <motion.span
                      className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-gold to-neon-blue"
                      initial={{
                        width: 0,
                      }}
                      whileHover={{
                        width: "100%",
                      }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
