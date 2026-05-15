
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  ChevronDown,
  Twitter,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
const faqs = [
  {
    question: "What makes VIPER ELITE different from competitors?",
    answer:
      "VIPER ELITE combines cutting-edge technology with luxury design, delivering unmatched performance and a premium user experience that sets new industry standards.",
  },
  {
    question: "Do you offer enterprise solutions?",
    answer:
      "Yes, we provide comprehensive enterprise solutions with dedicated support, custom implementations, and scalable infrastructure designed for large organizations.",
  },
  {
    question: "What is the warranty on VIPER ELITE products?",
    answer:
      "All VIPER ELITE hardware products come with a 3-year premium warranty, while software subscriptions include lifetime updates and 24/7 support.",
  },
  {
    question: "How can I become a VIPER ELITE partner?",
    answer:
      "Join our partner program by contacting our business development team. We offer exclusive benefits, early access to products, and dedicated support for our partners.",
  },
  {
    question: "Is there a trial period for your software?",
    answer:
      "Yes, we offer a 30-day free trial for all our software products. Experience the full capabilities of VIPER ELITE before committing.",
  },
];
const socialLinks = [
  {
    icon: Twitter,
    href: "#",
    label: "Twitter",
  },
  {
    icon: Github,
    href: "#",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
  },
];
export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            subtitle={t.contact.subtitle}
            title={t.contact.title}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <GlassCard hover={false} className="p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      className="flex flex-col items-center justify-center py-12"
                      key={"success"}
                    >
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                        className="w-16 h-16 rounded-full bg-neon-green flex items-center justify-center mb-4"
                      >
                        <Check className="w-8 h-8 text-deep-black" />
                      </motion.div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {t.contact.form.success}
                      </h3>
                      <p className="text-muted-foreground text-center">
                        We'll get back to you as soon as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      key={"form"}
                    >
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border/50 text-foreground focus:outline-none focus:border-neon-blue transition-colors peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="name"
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.name || focusedField === "name" ? "-top-2 text-xs text-neon-blue bg-card px-1" : "top-3 text-muted-foreground"}`}
                        >
                          {t.contact.form.name}
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border/50 text-foreground focus:outline-none focus:border-neon-blue transition-colors peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="email"
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.email || focusedField === "email" ? "-top-2 text-xs text-neon-blue bg-card px-1" : "top-3 text-muted-foreground"}`}
                        >
                          {t.contact.form.email}
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border/50 text-foreground focus:outline-none focus:border-neon-blue transition-colors peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="subject"
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.subject || focusedField === "subject" ? "-top-2 text-xs text-neon-blue bg-card px-1" : "top-3 text-muted-foreground"}`}
                        >
                          {t.contact.form.subject}
                        </label>
                      </div>
                      <div className="relative">
                        <textarea
                          name="message"
                          id="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border/50 text-foreground focus:outline-none focus:border-neon-blue transition-colors resize-none peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor="message"
                          className={`absolute left-4 transition-all duration-200 pointer-events-none ${formData.message || focusedField === "message" ? "-top-2 text-xs text-neon-blue bg-card px-1" : "top-3 text-muted-foreground"}`}
                        >
                          {t.contact.form.message}
                        </label>
                      </div>
                      <GlowButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {t.contact.form.submit}
                      </GlowButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="space-y-6"
            >
              <GlassCard glowColor="blue">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-blue/50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-deep-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      {t.contact.info.email}
                    </p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard glowColor="green">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green to-neon-green/50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-deep-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      {t.contact.info.phone}
                    </p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard glowColor="gold">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold/50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-deep-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      {t.contact.info.address}
                    </p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard hover={false}>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-secondary via-secondary/50 to-secondary overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-neon-blue mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Interactive Map
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                                       linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />
                </div>
              </GlassCard>
              <div className="flex items-center gap-4 justify-center">
                {socialLinks.map((social) => (
                  <motion.a
                    href={social.href}
                    whileHover={{
                      scale: 1.2,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="p-3 rounded-xl glass text-muted-foreground hover:text-neon-blue transition-colors"
                    aria-label={social.label}
                    key={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t.contact.faq.title} />
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                  delay: index * 0.1,
                }}
                key={index}
              >
                <GlassCard hover={false}>
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="font-semibold pr-4">{faq.question}</h3>
                    <motion.div
                      animate={{
                        rotate: expandedFaq === index ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <ChevronDown className="w-5 h-5 text-neon-blue flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground mt-4 pt-4 border-t border-border/50">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
