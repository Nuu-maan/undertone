export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 py-8 text-xs text-muted-foreground">
      <span>Jev reads the tone. Code does the rest.</span>
      <a
        href="https://github.com/Nuu-maan/undertone"
        className="underline-offset-4 hover:text-foreground hover:underline"
      >
        GitHub
      </a>
    </footer>
  );
}
