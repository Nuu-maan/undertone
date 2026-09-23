import { FLAGS, TONES, type Flag, type Reading, type Tone } from "./types";

export type Mood = Tone | Flag;

export type Verdict = {
  mood: Mood;
  label: string;
  strength: number;
};

export const MOOD_LABELS: Record<Mood, string> = {
  neutral: "Reads neutral",
  warm: "Reads friendly",
  excited: "Reads excited",
  cold: "Reads cold",
  anxious: "Reads anxious",
  angry: "Reads angry",
  passiveAggressive: "Passive-aggressive",
  sarcastic: "Sarcastic",
  apologetic: "Over-apologizing",
  pushy: "Pushy",
};

const FLAG_THRESHOLD = 0.55;

const verdict = (mood: Mood, strength: number): Verdict => ({ mood, label: MOOD_LABELS[mood], strength });

export function verdictFor(reading: Reading): Verdict {
  const flags = FLAGS.filter((f) => reading.flags[f] >= FLAG_THRESHOLD).map((f) => verdict(f, reading.flags[f]));
  const tones = TONES.filter((t) => t !== "neutral" && reading.tone[t] > reading.tone.neutral).map((t) =>
    verdict(t, reading.tone[t]),
  );
  const candidates = [...flags, ...tones];
  if (!candidates.length) return verdict("neutral", reading.tone.neutral);
  return candidates.reduce((best, c) => (c.strength > best.strength ? c : best));
}
