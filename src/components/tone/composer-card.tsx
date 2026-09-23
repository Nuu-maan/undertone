"use client";

import { AnimatePresence, motion, type TargetAndTransition } from "motion/react";
import { Kbd } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";
import type { ToneResult } from "@/lib/tone/types";
import type { Mood, Verdict } from "@/lib/tone/verdict";
import { BossSafe } from "./boss-safe";
import { PhraseTips } from "./phrase-tips";
import { SignalMeters } from "./signal-meters";
import { VerdictBadge } from "./verdict-badge";

const REACTIONS: Partial<Record<Mood, TargetAndTransition>> = {
  angry: { x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } },
  pushy: { x: [0, -4, 4, 0], transition: { duration: 0.3 } },
  anxious: { rotate: [0, -0.8, 0.8, -0.5, 0], transition: { duration: 0.5 } },
  apologetic: { scale: [1, 0.98, 1], transition: { duration: 0.4 } },
  excited: { y: [0, -6, 0], transition: { duration: 0.35, ease: "easeOut" } },
  cold: { scale: [1, 0.99, 1], transition: { duration: 0.6 } },
};

type Props = {
  text: string;
  placeholder: string;
  onTextChange: (text: string) => void;
  verdict: Verdict | null;
  result: ToneResult | null;
};

export function ComposerCard({ text, placeholder, onTextChange, verdict, result }: Props) {
  return (
    <motion.div
      animate={verdict ? REACTIONS[verdict.mood] : undefined}
      className="mood-ring overflow-hidden rounded-[28px] border bg-card"
    >
      <Textarea
        autoFocus
        rows={1}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onTextChange("")}
        placeholder={placeholder}
        aria-label="Message"
        maxLength={2000}
        className="min-h-0 resize-none rounded-none border-0 bg-transparent px-5 py-4 text-xl leading-relaxed shadow-none focus-visible:ring-0 md:text-xl dark:bg-transparent"
      />
      <AnimatePresence initial={false}>
        {verdict && result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="grid gap-5 px-5 pt-1 pb-4">
              <VerdictBadge verdict={verdict} />
              <SignalMeters reading={result.reading} />
              <PhraseTips text={text} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Kbd>Esc</Kbd> to clear
                </span>
                <BossSafe score={result.reading.bossSafe} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
