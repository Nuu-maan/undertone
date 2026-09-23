import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import type { Verdict } from "@/lib/tone/verdict";
import { MoodIcon } from "./mood-icon";

export function VerdictBadge({ verdict }: { verdict: Verdict | null }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={verdict?.mood ?? "idle"}
        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
        transition={{ duration: 0.2 }}
      >
        {verdict ? (
          <Badge className="h-7 gap-1.5 bg-[color-mix(in_oklch,var(--mood)_14%,transparent)] px-3 text-sm text-(--mood-ink)">
            <MoodIcon mood={verdict.mood} />
            {verdict.label}
            <span className="tabular-nums opacity-60">{Math.round(verdict.strength * 100)}%</span>
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground">Start typing…</span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
