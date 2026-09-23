import { motion } from "motion/react";
import { row } from "@/lib/motion";
import { matchPhrases } from "@/lib/tone/phrases";

export function PhraseTips({ text }: { text: string }) {
  const tips = matchPhrases(text).filter((p) => p.tip);
  if (!tips.length) return null;
  return (
    <motion.ul variants={row} className="grid gap-2 rounded-2xl bg-muted/60 p-3">
      {tips.map((t) => (
        <li key={t.pattern.source} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
          <span className="rounded-md bg-(--mood)/15 px-1.5 font-mono text-xs text-(--mood-ink)">{t.quote}</span>
          <span className="text-muted-foreground">{t.tip}</span>
        </li>
      ))}
    </motion.ul>
  );
}
