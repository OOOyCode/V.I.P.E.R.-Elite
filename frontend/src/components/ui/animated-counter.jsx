
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 2000,
  });
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);
  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix, prefix]);
  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
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
      {prefix}0{suffix}
    </motion.span>
  );
}
