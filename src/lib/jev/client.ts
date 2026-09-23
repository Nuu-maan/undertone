import "server-only";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import type { Reading } from "@/lib/tone/types";
import { questions } from "./questions";

const MODEL = process.env.JEV_MODEL || "jev-latest";

let client: TypeSafeClient | null = null;

export const hasJevKey = () => (process.env.TYPESAFE_API_KEY?.trim().length ?? 0) >= 12;

function getClient() {
  client ??= new TypeSafeClient({ defaultModel: MODEL, retry: { maxRetries: 0 }, timeout: 3000 });
  return client;
}

const normalize = ({ score, legend }: { score: number; legend: object }) =>
  score / (Object.keys(legend).length - 1);

export async function readWithJev(text: string, signal?: AbortSignal) {
  const res = await getClient().systemOne({ state: { message: text }, questions }, { signal });
  const a = res.answers;
  const reading: Reading = {
    tone: { ...a.tone.probabilities },
    flags: {
      passiveAggressive: a.passiveAggressive.noul,
      sarcastic: a.sarcastic.noul,
      apologetic: a.apologetic.noul,
      pushy: a.pushy.noul,
    },
    urgency: normalize(a.urgency),
    formality: normalize(a.formality),
    bossSafe: a.bossSafe.noul,
  };
  return { reading, model: res.model };
}
