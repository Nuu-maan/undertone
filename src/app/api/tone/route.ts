import { z } from "zod";
import { hasJevKey, readWithJev } from "@/lib/jev/client";
import { offlineReading } from "@/lib/tone/offline";
import type { ToneResult } from "@/lib/tone/types";

const body = z.object({ text: z.string().trim().min(1).max(2000) });

const offline = (text: string, started: number): ToneResult => ({
  reading: offlineReading(text),
  source: "offline",
  model: "offline",
  latencyMs: Math.round(performance.now() - started),
});

export async function POST(request: Request) {
  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Expected { text: string }" }, { status: 400 });

  const { text } = parsed.data;
  const started = performance.now();
  if (!hasJevKey()) return Response.json(offline(text, started));

  try {
    const { reading, model } = await readWithJev(text, request.signal);
    const result: ToneResult = { reading, source: "jev", model, latencyMs: Math.round(performance.now() - started) };
    return Response.json(result);
  } catch (err) {
    if (request.signal.aborted) return new Response(null, { status: 499 });
    console.warn("[jev] falling back to offline:", err instanceof Error ? err.message : err);
    return Response.json(offline(text, started));
  }
}
