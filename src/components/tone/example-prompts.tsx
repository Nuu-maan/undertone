import { Button } from "@/components/ui/button";

const EXAMPLES = [
  "Per my last email, the deck is due Friday.",
  "So sorry to bother you, no worries if not!",
  "I need this ASAP. Thanks in advance.",
  "Oh great, another meeting that could've been an email.",
  "This is UNACCEPTABLE!!",
  "Can't wait for Friday, you all are amazing!",
  "k.",
];

export function ExamplePrompts({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {EXAMPLES.map((e) => (
        <Button key={e} variant="outline" size="sm" className="rounded-full font-normal" onClick={() => onPick(e)}>
          {e.length > 32 ? `${e.slice(0, 30)}…` : e}
        </Button>
      ))}
    </div>
  );
}
