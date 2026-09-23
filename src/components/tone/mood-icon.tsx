import {
  CircleIcon,
  FlameIcon,
  HandIcon,
  HeartIcon,
  type LucideProps,
  MegaphoneIcon,
  SmileIcon,
  SnowflakeIcon,
  SparklesIcon,
  SwordsIcon,
  ZapIcon,
} from "lucide-react";
import type { Mood } from "@/lib/tone/verdict";

const ICONS: Record<Mood, React.ComponentType<LucideProps>> = {
  neutral: CircleIcon,
  warm: HeartIcon,
  excited: SparklesIcon,
  cold: SnowflakeIcon,
  anxious: ZapIcon,
  angry: FlameIcon,
  passiveAggressive: SwordsIcon,
  sarcastic: SmileIcon,
  apologetic: HandIcon,
  pushy: MegaphoneIcon,
};

export function MoodIcon({ mood, ...props }: LucideProps & { mood: Mood }) {
  const Icon = ICONS[mood];
  return <Icon {...props} />;
}
