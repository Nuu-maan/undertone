export const EXAMPLES = [
  "Per my last email, the deck is due Friday.",
  "So sorry to bother you, no worries if not!",
  "I need this ASAP. Thanks in advance.",
  "Oh great, another meeting that could've been an email.",
  "Can't wait for Friday, you all are amazing!",
];

export function ExamplePrompts({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <span>Try</span>
      {EXAMPLES.slice(0, 3).map((e) => (
        <button
          key={e}
          onClick={() => onPick(e)}
          className="underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
        >
          {e.split(/[,.!]/)[0]}
        </button>
      ))}
    </div>
  );
}
