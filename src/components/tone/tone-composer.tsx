"use client";

import { useState } from "react";
import { useTone } from "@/hooks/use-tone";
import { verdictFor } from "@/lib/tone/verdict";
import { ComposerCard } from "./composer-card";
import { ExamplePrompts } from "./example-prompts";
import { PhraseTips } from "./phrase-tips";
import { SignalMeters } from "./signal-meters";

export function ToneComposer() {
  const [text, setText] = useState("");
  const { result, pending } = useTone(text);
  const verdict = result ? verdictFor(result.reading) : null;

  return (
    <div data-mood={verdict?.mood ?? "neutral"} className="grid gap-6">
      <ComposerCard text={text} onTextChange={setText} verdict={verdict} result={result} pending={pending} />
      <ExamplePrompts onPick={setText} />
      <div className="grid gap-4 sm:grid-cols-2">
        <SignalMeters reading={result?.reading ?? null} />
        <PhraseTips text={text} />
      </div>
    </div>
  );
}
