
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
const socialLinks = [
  {
    icon: Twitter,
    href: "#",
    label: "Twitter",
  },
  {
    icon: Youtube,
    href: "#",
    label: "YouTube",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
  },
];
const quickLinks = [
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
export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative">
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--neon-blue) 20%, var(--gold) 50%, var(--neon-green) 80%, transparent 100%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className="border-t border-white/5"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(5,5,10,1) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
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
              >
                <Link to="/" className="inline-block">
                  <motion.span
                    className="text-2xl font-bold tracking-[0.2em] text-gold"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                  >
                    VIPER ELITE
                  </motion.span>
                </Link>
                <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
                  Premium 3D models and expert courses for elite digital
                  creators. Master the art of 3D creation with our world-class
                  resources.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      href={social.href}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: i * 0.1,
                      }}
                      whileHover={{
                        scale: 1.2,
                        y: -4,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="p-3 rounded-xl text-muted-foreground hover:text-gold transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                      aria-label={social.label}
                      key={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
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
                delay: 0.1,
              }}
            >
              <h4
                className="text-sm font-semibold uppercase tracking-wider text-gold mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                }}
              >
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: i * 0.05,
                    }}
                    key={link.key}
                  >
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-neon-blue transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue/50 group-hover:bg-neon-blue transition-colors" />
                      {t.nav[link.key]}
                    </Link>
                  </motion.li>
                ))}
              </ul>
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
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >
              <h4
                className="text-sm font-semibold uppercase tracking-wider text-gold mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                }}
              >
                {t.footer.legal}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-neon-blue transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green/50 group-hover:bg-neon-green transition-colors" />
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-neon-blue transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green/50 group-hover:bg-neon-green transition-colors" />
                    {t.footer.terms}
                  </Link>
                </li>
              </ul>
              <div
                className="mt-8 p-4 rounded-xl"
                style={{
                  background: "rgba(212, 175, 55, 0.05)",
                  border: "1px solid rgba(212, 175, 55, 0.1)",
                }}
              >
                <p className="text-xs text-gold/80">Join the Elite</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Get exclusive updates and early access to new content.
                </p>
              </div>
            </motion.div>
          </div>
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
              duration: 0.6,
              delay: 0.3,
            }}
            className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-muted-foreground">
              Â© {t.footer.copyright}
            </p>
            <motion.p
              className="text-xs tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--font-display)",
                background:
                  "linear-gradient(90deg, var(--gold) 0%, #fbbf24 50%, var(--gold) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              DOMINA ET VINCE
            </motion.p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
