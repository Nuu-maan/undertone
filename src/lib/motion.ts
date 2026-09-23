import type { Variants } from "motion/react";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export const panel: Variants = {
  hidden: { opacity: 0, height: 0 },
  shown: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.25, ease: EASE_OUT, staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

export const row: Variants = {
  hidden: { opacity: 0, transform: "translateY(4px)" },
  shown: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.2, ease: EASE_OUT } },
};

export const swap = {
  initial: { opacity: 0, transform: "translateY(4px)", filter: "blur(2px)" },
  animate: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
  exit: { opacity: 0, transform: "translateY(-4px)", filter: "blur(2px)" },
  transition: { duration: 0.15, ease: EASE_OUT },
};
