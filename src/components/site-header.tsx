import Link from "next/link";

const links = [
  { href: "/topics", label: "Topics" },
  { href: "/study", label: "Study Mode" },
  { href: "/quiz", label: "Quiz" },
  { href: "/memory-hooks", label: "Memory Hooks" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-[radial-gradient(circle_at_30%_30%,_white,_#b9e5ff_55%,_#78c8ff)] text-lg font-semibold text-sky-950 shadow-[var(--shadow)]">
            B
          </div>
          <div>
            <p className="font-display text-xl leading-none">Bubble</p>
            <p className="text-sm text-[color:var(--muted)]">
              Calc 1 survival review
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-2 transition hover:border-[color:var(--line-strong)] hover:bg-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
