import { BriefcaseIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function BossSafe({ score }: { score: number }) {
  const safe = score >= 0.5;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <BriefcaseIcon className="size-3.5" />
          {safe ? "Boss-safe" : "Not boss-safe"}
          <span className={safe ? "size-1.5 rounded-full bg-emerald-500" : "size-1.5 rounded-full bg-red-500"} />
        </span>
      </TooltipTrigger>
      <TooltipContent>Would you send this to your manager?</TooltipContent>
    </Tooltip>
  );
}
