import { CheckIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { matchPhrases } from "@/lib/tone/phrases";

export function PhraseTips({ text }: { text: string }) {
  const tips = matchPhrases(text).filter((p) => p.tip);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        {tips.length ? (
          <ul className="grid gap-3">
            {tips.map((t) => (
              <li key={t.pattern.source} className="grid gap-0.5">
                <span className="w-fit rounded bg-(--mood)/15 px-1.5 font-mono text-xs text-(--mood-ink)">
                  “{t.quote}”
                </span>
                <span className="text-sm">{t.tip}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckIcon className="size-4" />
            {text.trim() ? "Nothing to fix. Send it." : "Tips show up here as you type."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
