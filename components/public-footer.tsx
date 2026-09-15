import Link from "next/link";

export function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-border py-6">
      <div className="flex flex-col items-center justify-center gap-2 px-6 text-center font-mono text-xs text-muted-foreground sm:flex-row sm:gap-4">
        <span>© {year} Job Tracker</span>
        <span aria-hidden="true" className="hidden sm:inline">
          {"//"}
        </span>
        <Link
          href="/cookies"
          className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Cookie Policy
        </Link>
        <span aria-hidden="true" className="hidden sm:inline">
          {"//"}
        </span>
        <Link
          href="/privacy"
          className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Privacy Policy
        </Link>
        <span aria-hidden="true" className="hidden sm:inline">
          {"//"}
        </span>
        <Link
          href="/terms"
          className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Terms
        </Link>
      </div>
    </footer>
  );
}
