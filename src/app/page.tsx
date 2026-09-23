import { GithubStars } from "@/components/site/github-stars";
import { MadeBy } from "@/components/site/made-by";
import { ToneComposer } from "@/components/tone/tone-composer";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center px-4 pt-[20vh] pb-16">
      <h1 className="sr-only">undertone: hear how your message sounds</h1>
      <GithubStars repo="Nuu-maan/undertone" />
      <ToneComposer />
      <MadeBy />
    </main>
  );
}
