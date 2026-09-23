import type { Flag, Tone } from "./types";

export type Phrase = {
  pattern: RegExp;
  signal: Flag | Tone;
  tip: string;
};

export const PHRASES: Phrase[] = [
  { pattern: /per my last (email|message)/i, signal: "passiveAggressive", tip: "Try “Just following up on…”" },
  { pattern: /as (i )?(already |previously )?(mentioned|said|stated)/i, signal: "passiveAggressive", tip: "Try “To recap…”" },
  { pattern: /not sure if you (saw|got)/i, signal: "passiveAggressive", tip: "Ask directly: “Did you get a chance to…”" },
  { pattern: /friendly reminder/i, signal: "passiveAggressive", tip: "Drop “friendly”, it rarely is" },
  { pattern: /thanks in advance/i, signal: "pushy", tip: "Presumes a yes. Try “Thanks!”" },
  { pattern: /with all due respect/i, signal: "angry", tip: "Signals the opposite. Just say the point" },
  { pattern: /no offen[cs]e/i, signal: "angry", tip: "Usually precedes offense. Cut it" },
  { pattern: /\basap\b/i, signal: "pushy", tip: "Give a real time, e.g. “by 3pm”" },
  { pattern: /\bi need (this|you|it)\b/i, signal: "pushy", tip: "Try “Could you…”" },
  { pattern: /sorry to (bother|bug|disturb)/i, signal: "apologetic", tip: "Skip the apology: “Quick question:”" },
  { pattern: /\b(so|really) sorry\b/i, signal: "apologetic", tip: "Try “Thanks for your patience”" },
  { pattern: /no worries if not/i, signal: "apologetic", tip: "Make the ask, let them say no" },
  { pattern: /\bjust (wanted|checking|following)/i, signal: "apologetic", tip: "Drop “just”, it shrinks your ask" },
  { pattern: /\bi (might be|could be) wrong\b/i, signal: "anxious", tip: "State it; they can correct you" },
  { pattern: /\b(oh )?great,? (another|more)\b/i, signal: "sarcastic", tip: "Sarcasm doesn't survive text" },
  { pattern: /\bsure,? (jan|buddy|pal)\b/i, signal: "sarcastic", tip: "Sarcasm doesn't survive text" },
  { pattern: /\bwow,? thanks\b/i, signal: "sarcastic", tip: "Reads sarcastic. Say what you mean" },
  { pattern: /^(k|fine|ok)\.?$/i, signal: "cold", tip: "One word reads curt. Add a line" },
  { pattern: /!{2,}/, signal: "angry", tip: "One exclamation mark is plenty" },
  { pattern: /\b[A-Z]{5,}\b/, signal: "angry", tip: "All caps reads as shouting" },
  { pattern: /\b(thank you so much|appreciate (it|you)|love this)\b/i, signal: "warm", tip: "" },
  { pattern: /\b(can't wait|so excited|let's go|amazing)\b/i, signal: "excited", tip: "" },
];

export function matchPhrases(text: string) {
  return PHRASES.filter((p) => p.pattern.test(text)).map((p) => ({
    ...p,
    quote: text.match(p.pattern)?.[0] ?? "",
  }));
}
