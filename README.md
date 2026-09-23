# undertone

**Hear how it sounds before you hit send.** A text box that reads the tone of your message as you type and grows into a reading of it: it glows in the tone's color, tells you if it's boss-safe, and points at the exact phrases doing the damage.

```
Per my last email, I need the deck ASAP.    →  Passive-aggressive · Not boss-safe
So sorry to bother you, no worries if not!  →  Over-apologizing
Can't wait for Friday, you're all amazing!  →  Reads excited
k.                                          →  Reads cold
```

## How it works

One [TypeSafe AI](https://typesafe.ai) **Jev** call answers eight typed questions about the message in parallel: overall tone, passive-aggression, sarcasm, over-apologizing, pushiness, urgency, formality, and whether you'd send it to your manager. Plain code turns those answers into a verdict, a color and phrase-level tips.

Without an API key it falls back to a built-in keyword classifier, so it runs out of the box.

## Run it

Requires [Bun](https://bun.sh).

```bash
bun install
bun dev
```

To use the online model:

```bash
cp .env.example .env.local   # then set TYPESAFE_API_KEY
```

The key is read only on the server, in `/api/tone`.

## Layout

```
src/
  app/api/tone/route.ts   POST { text } → ToneResult
  lib/jev/                Jev questions and server client
  lib/tone/               reading model, offline classifier, verdict, phrase tips
  hooks/use-tone.ts       debounced, abortable fetch
  components/tone/        composer card, verdict badge, meters, tips
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun run check` | Typecheck, lint and test |
| `bun run build` | Production build |
