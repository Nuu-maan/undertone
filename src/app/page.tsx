import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ToneComposer } from "@/components/tone/tone-composer";
import { hasJevKey } from "@/lib/jev/client";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4">
      <SiteHeader online={hasJevKey()} />
      <section className="py-10 text-center sm:py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Hear how it sounds before you hit send.
        </h1>
        <p className="mt-4 text-muted-foreground text-balance">
          Type a message. The box reacts to its tone: passive-aggressive, pushy, cold, or just fine.
        </p>
      </section>
      <ToneComposer />
      <div className="flex-1" />
      <SiteFooter />
    </main>
  );
}
