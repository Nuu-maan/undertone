import type { ToneResult } from "@/lib/tone/types";

export function LatencyHud({ result, pending }: { result: ToneResult | null; pending: boolean }) {
  return (
    <p className="fixed right-4 bottom-4 font-mono text-xs text-muted-foreground tabular-nums" aria-live="polite">
      {pending ? "reading…" : result ? `${result.latencyMs}ms · 8q · ${result.model === "offline" ? "jev-offline" : result.model}` : ""}
    </p>
  );
}
