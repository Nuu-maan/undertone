"use client";

import { useEffect, useState } from "react";
import type { ToneResult } from "@/lib/tone/types";

export function useTone(text: string, debounceMs = 350) {
  const [result, setResult] = useState<ToneResult | null>(null);
  const [pending, setPending] = useState(false);
  const empty = !text.trim();

  useEffect(() => {
    if (empty) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setPending(true);
      try {
        const res = await fetch("/api/tone", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        });
        if (res.ok) setResult(await res.json());
      } catch {
        return;
      }
      setPending(false);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text, empty, debounceMs]);

  return { result: empty ? null : result, pending: !empty && pending };
}
