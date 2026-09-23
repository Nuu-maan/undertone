import { choice, noul, score } from "@typesafe-ai/sdk";

export const questions = {
  tone: choice("The overall emotional tone the recipient would read in this message", {
    neutral: "Plain and factual, no clear emotion",
    warm: "Friendly, kind, grateful or appreciative",
    excited: "Enthusiastic, eager or celebrating",
    cold: "Curt, distant or dismissive",
    anxious: "Nervous, uncertain or worried",
    angry: "Frustrated, annoyed or hostile",
  }),
  passiveAggressive: noul("The message hides irritation or blame behind polite wording"),
  sarcastic: noul("The message says the opposite of what it means, mockingly"),
  apologetic: noul("The writer apologizes, hedges or minimizes their own request more than needed"),
  pushy: noul("The writer demands action or pressures the recipient rather than asking"),
  urgency: score("How urgent or time-pressured the message sounds", [
    "Not urgent at all",
    "Somewhat time-sensitive",
    "Urgent, needs immediate action",
  ]),
  formality: score("How formal the wording is", [
    "Slang or very casual",
    "Casual and conversational",
    "Professional",
    "Very formal",
  ]),
  bossSafe: noul("This message would be appropriate to send to a manager at work"),
};
