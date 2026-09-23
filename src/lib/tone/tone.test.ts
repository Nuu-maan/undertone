import { expect, test } from "bun:test";
import { offlineReading } from "./offline";
import { matchPhrases } from "./phrases";
import { verdictFor } from "./verdict";

const moodOf = (text: string) => verdictFor(offlineReading(text)).mood;

test("classic office phrases get their verdict", () => {
  expect(moodOf("Per my last email, as I already mentioned, the deadline is Friday.")).toBe("passiveAggressive");
  expect(moodOf("So sorry to bother you, no worries if not!")).toBe("apologetic");
  expect(moodOf("I need this ASAP, immediately.")).toBe("pushy");
  expect(moodOf("This is UNACCEPTABLE!!")).toBe("angry");
  expect(moodOf("k.")).toBe("cold");
  expect(moodOf("The meeting is at 3pm in room 4.")).toBe("neutral");
});

test("phrase matches carry the quoted text and a tip", () => {
  const [hit] = matchPhrases("hey, per my last email the file is attached");
  expect(hit.quote).toBe("per my last email");
  expect(hit.tip).toContain("following up");
});

test("heated messages are not boss-safe", () => {
  expect(offlineReading("with all due respect this is RIDICULOUS!!").bossSafe).toBeLessThan(0.5);
  expect(offlineReading("Thanks for the update, looks good.").bossSafe).toBeGreaterThan(0.5);
});
