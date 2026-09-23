"use client";

import { motion, type TargetAndTransition } from "motion/react";
import { Card, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { ToneResult } from "@/lib/tone/types";
import type { Mood, Verdict } from "@/lib/tone/verdict";
import { BossSafe } from "./boss-safe";
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
  onTextChange: (text: string) => void;
  verdict: Verdict | null;
  result: ToneResult | null;
  pending: boolean;
};

export function ComposerCard({ text, onTextChange, verdict, result, pending }: Props) {
  return (
    <motion.div animate={verdict ? REACTIONS[verdict.mood] : undefined}>
      <Card className="mood-ring gap-0 py-0">
        <Textarea
          autoFocus
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Type the message you're about to send…"
          aria-label="Message"
          maxLength={2000}
          className="min-h-44 resize-none rounded-none border-0 bg-transparent p-5 text-lg leading-relaxed shadow-none focus-visible:ring-0 md:text-lg dark:bg-transparent"
        />
        <CardFooter className="flex-wrap justify-between gap-3 bg-transparent">
          <VerdictBadge verdict={verdict} />
          <div className="flex items-center gap-4">
            {result && <BossSafe score={result.reading.bossSafe} />}
            <span className="font-mono text-xs text-muted-foreground tabular-nums" aria-live="polite">
              {pending ? "reading…" : result ? `${result.model} · ${result.latencyMs}ms` : ""}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
