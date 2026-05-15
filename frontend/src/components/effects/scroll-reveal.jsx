
import { motion } from "framer-motion";
const directionVariants = {
  up: {
    y: 40,
    opacity: 0,
  },
  down: {
    y: -40,
    opacity: 0,
  },
  left: {
    x: 40,
    opacity: 0,
  },
  right: {
    x: -40,
    opacity: 0,
  },
};
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}) {
  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function StaggerContainer({ children, className, staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-100px",
      }}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
