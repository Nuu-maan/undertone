import { AnimatePresence, motion } from "motion/react";
import type { Verdict } from "@/lib/tone/verdict";
import { MoodIcon } from "./mood-icon";

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-xl bg-(--mood)/12 text-(--mood-ink) transition-colors">
        <MoodIcon mood={verdict.mood} className="size-5" />
      </div>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={verdict.mood}
          initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
          className="flex items-baseline gap-2"
        >
          <span className="font-medium">{verdict.label}</span>
          <span className="text-sm text-muted-foreground tabular-nums">{Math.round(verdict.strength * 100)}%</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
