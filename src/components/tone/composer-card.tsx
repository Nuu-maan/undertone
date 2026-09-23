"use client";

import { motion } from "motion/react";
import { Kbd } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";
import { panel, row } from "@/lib/motion";
import type { ToneResult } from "@/lib/tone/types";
import type { Verdict } from "@/lib/tone/verdict";
import { BossSafe } from "./boss-safe";
import { PhraseTips } from "./phrase-tips";
import { SignalMeters } from "./signal-meters";
import { VerdictBadge } from "./verdict-badge";

type Props = {
  text: string;
  placeholder: string;
  onTextChange: (text: string) => void;
  verdict: Verdict | null;
  result: ToneResult | null;
};

export function ComposerCard({ text, placeholder, onTextChange, verdict, result }: Props) {
  return (
    <div className="mood-ring overflow-hidden rounded-[28px] border bg-card">
      <Textarea
        autoFocus
        rows={1}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onTextChange("")}
        placeholder={placeholder}
        aria-label="Message"
        maxLength={2000}
        className="min-h-0 resize-none rounded-none border-0 bg-transparent px-5 py-4 text-xl leading-relaxed shadow-none focus-visible:ring-0 md:text-xl"
      />
      {verdict && result && (
        <motion.div variants={panel} initial="hidden" animate="shown">
          <div className="grid gap-5 px-5 pt-1 pb-4">
            <motion.div variants={row}>
              <VerdictBadge verdict={verdict} />
            </motion.div>
            <motion.div variants={row}>
              <SignalMeters reading={result.reading} />
            </motion.div>
            <PhraseTips text={text} />
            <motion.div variants={row} className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Kbd>Esc</Kbd> to clear
              </span>
              <BossSafe score={result.reading.bossSafe} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
