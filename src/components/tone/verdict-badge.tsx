import { AnimatePresence, motion } from "motion/react";
import { swap } from "@/lib/motion";
import type { Verdict } from "@/lib/tone/verdict";
import { MoodIcon } from "./mood-icon";

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-xl bg-(--mood)/12 text-(--mood-ink) transition-colors duration-300">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={verdict.mood} {...swap}>
            <MoodIcon mood={verdict.mood} className="size-5" />
          </motion.span>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={verdict.mood} {...swap} className="flex items-baseline gap-2">
          <span className="font-medium">{verdict.label}</span>
          <span className="text-sm text-muted-foreground tabular-nums">{Math.round(verdict.strength * 100)}%</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
