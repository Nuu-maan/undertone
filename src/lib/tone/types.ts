export const TONES = ["neutral", "warm", "excited", "cold", "anxious", "angry"] as const;
export type Tone = (typeof TONES)[number];

export const FLAGS = ["passiveAggressive", "sarcastic", "apologetic", "pushy"] as const;
export type Flag = (typeof FLAGS)[number];

export type Reading = {
  tone: Record<Tone, number>;
  flags: Record<Flag, number>;
  urgency: number;
  formality: number;
  bossSafe: number;
};

export type ToneResult = {
  reading: Reading;
  source: "jev" | "offline";
  model: string;
  latencyMs: number;
};
