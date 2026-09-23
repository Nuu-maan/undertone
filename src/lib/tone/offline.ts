import { matchPhrases } from "./phrases";
import { FLAGS, TONES, type Flag, type Reading, type Tone } from "./types";

const WORDS: Record<Tone | Flag, RegExp> = {
  neutral: /$^/,
  warm: /\b(thanks|thank you|appreciate|glad|happy|lovely|kind)\b/gi,
  excited: /\b(excited|awesome|amazing|yay|woo+|can't wait|stoked)\b|!/gi,
  cold: /^\s*(k|ok|fine|noted|whatever)\s*\.?\s*$/gi,
  anxious: /\b(worried|nervous|maybe|hopefully|i think|i guess|not sure)\b/gi,
  angry: /\b(ridiculous|unacceptable|seriously|furious|hate|stupid|wtf)\b/gi,
  passiveAggressive: /\b(per my|as mentioned|friendly reminder|going forward)\b/gi,
  sarcastic: /\b(oh great|yeah right|sure jan|wow thanks|totally)\b/gi,
  apologetic: /\b(sorry|apologi[sz]e|my bad|no worries)\b/gi,
  pushy: /\b(asap|immediately|right now|need (this|it)|urgent)\b/gi,
};

const hits = (text: string, key: Tone | Flag) =>
  (text.match(WORDS[key])?.length ?? 0) + matchPhrases(text).filter((p) => p.signal === key).length * 2;

const squash = (n: number) => 1 - Math.exp(-n / 2);

export function offlineReading(text: string): Reading {
  const raw = Object.fromEntries(TONES.map((t) => [t, hits(text, t)])) as Record<Tone, number>;
  raw.neutral = 1;
  const total = TONES.reduce((sum, t) => sum + raw[t], 0);
  const tone = Object.fromEntries(TONES.map((t) => [t, raw[t] / total])) as Record<Tone, number>;
  const flags = Object.fromEntries(FLAGS.map((f) => [f, squash(hits(text, f))])) as Record<Flag, number>;
  const heat = Math.max(tone.angry, flags.passiveAggressive, flags.sarcastic);

  return {
    tone,
    flags,
    urgency: squash(hits(text, "pushy")),
    formality: /\b(dear|regards|sincerely|kindly|please find)\b/i.test(text) ? 0.8 : 0.4,
    bossSafe: 1 - heat,
  };
}
