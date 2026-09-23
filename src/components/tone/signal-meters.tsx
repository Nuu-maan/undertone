import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Reading } from "@/lib/tone/types";

const meters = (r: Reading | null) => [
  { label: "Passive-aggressive", value: r?.flags.passiveAggressive },
  { label: "Sarcasm", value: r?.flags.sarcastic },
  { label: "Apologetic", value: r?.flags.apologetic },
  { label: "Pushy", value: r?.flags.pushy },
  { label: "Urgency", value: r?.urgency },
  { label: "Formality", value: r?.formality },
];

export function SignalMeters({ reading }: { reading: Reading | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signals</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {meters(reading).map(({ label, value = 0 }) => (
          <div key={label} className="grid gap-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{label}</span>
              <span className="tabular-nums">{Math.round(value * 100)}</span>
            </div>
            <Progress
              value={value * 100}
              aria-label={label}
              className="[&>[data-slot=progress-indicator]]:bg-(--mood) [&>[data-slot=progress-indicator]]:duration-500"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
