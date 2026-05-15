
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function SectionHeader({
  title,
  subtitle,
  className,
  align = "center",
}) {
  return (
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
        margin: "-100px",
      }}
      transition={{
        duration: 0.6,
      }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className,
      )}
    >
      {subtitle && (
        <motion.span
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
            duration: 0.6,
            delay: 0.1,
          }}
          className="inline-block text-sm tracking-[0.3em] uppercase text-neon-blue mb-4"
        >
          {subtitle}
        </motion.span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance"
        style={{
          fontFamily: "var(--font-display)",
        }}
      >
        <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <motion.div
        initial={{
          width: 0,
        }}
        whileInView={{
          width: align === "center" ? "100px" : "60px",
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className={cn(
          "h-[2px] bg-gradient-to-r from-neon-blue to-neon-green mt-6",
          align === "center" && "mx-auto",
        )}
      />
    </motion.div>
  );
}
