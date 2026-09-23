"use client";

import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { useTone } from "@/hooks/use-tone";
import { verdictFor } from "@/lib/tone/verdict";
import { ComposerCard } from "./composer-card";
import { EXAMPLES, ExamplePrompts } from "./example-prompts";
import { LatencyHud } from "./latency-hud";

export function ToneComposer() {
  const [text, setText] = useState("");
  const [example, setExample] = useState(0);
  const { result, pending } = useTone(text);
  const verdict = result ? verdictFor(result.reading) : null;

  useEffect(() => {
    const id = setInterval(() => setExample((i) => (i + 1) % EXAMPLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div data-mood={verdict?.mood ?? "idle"} className="grid w-full max-w-xl gap-4">
        <ComposerCard
          text={text}
          placeholder={EXAMPLES[example]}
          onTextChange={setText}
          verdict={verdict}
          result={result}
        />
        {!text && (
          <div className="grid gap-2 text-center">
            <p className="text-sm text-muted-foreground">Type a message. It tells you how it sounds before you send it.</p>
            <ExamplePrompts onPick={setText} />
          </div>
        )}
        <LatencyHud result={result} pending={pending} />
      </div>
    </MotionConfig>
  );
}
