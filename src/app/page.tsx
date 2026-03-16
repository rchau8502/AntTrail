import { CourseCoverageChart } from "@/components/course-coverage-chart";
import { MathConceptVisual } from "@/components/math-concept-visual";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { allCards, getDashboardStats } from "@/lib/bubble";

const sampleCards = [
  allCards.find((card) => card.id === "chain-rule"),
  allCards.find((card) => card.id === "calc2-ratio-test"),
  allCards.find((card) => card.id === "calc3-stokes-theorem"),
].filter((card): card is (typeof allCards)[number] => Boolean(card));

const bubbleFields = [
  "Name",
  "Use it when",
  "Looks like",
  "Do this",
  "Think of it as",
  "Watch out for",
  "Remember this",
];

export default function Home() {
  const stats = getDashboardStats();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="bubble-shadow overflow-hidden rounded-[2.5rem] border border-[color:var(--line)] bg-[linear-gradient(140deg,rgba(255,255,255,0.96),rgba(226,243,255,0.78)_55%,rgba(255,236,218,0.92))] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,28rem)]">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Bubble Expanded
              </p>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-5xl leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl">
                  The outer shell of Calculus 1, 2, and 3.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                  Bubble follows the Stewart 9e calc sequence, from limits and
                  derivatives to series, multivariable calculus, and vector
                  calculus.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/topics"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
                >
                  Browse all topics
                </Link>
                <Link
                  href="/study"
                  className="rounded-full border border-[color:var(--line-strong)] bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                >
                  Jump into study mode
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4">
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.totalCards}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    Bubble Cards
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4">
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.courses}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    Courses
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4">
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.units}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">Units</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4">
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.starterCards}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">Starter cards</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-4">
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.chapters}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">
                    Chapter groups
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-[2rem] border border-white/80 bg-white/80 p-6">
              <div className="flex items-center gap-3">
                <div className="bubble-shadow h-12 w-12 rounded-full bg-[radial-gradient(circle_at_30%_30%,_white,_#b9e5ff_55%,_#78c8ff)]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Bubble philosophy
                  </p>
                  <p className="text-sm text-[color:var(--muted)]">
                    Light, useful, easy to scan
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {sampleCards.map((card) => (
                  <MathConceptVisual key={card.id} card={card} mode="compact" />
                ))}
              </div>

              <div className="grid gap-3">
                {bubbleFields.map((field, index) => (
                  <div
                    key={field}
                    className="flex items-center justify-between rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3"
                  >
                    <span className="text-sm font-medium text-slate-900">
                      {field}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm leading-6 text-[color:var(--muted)]">
                Bubble is intentionally shallow. The app aims for “I know what
                to do” before “I understand every proof.”
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              What students get
            </p>
            <h2 className="mt-4 font-display text-4xl text-slate-900">
              Fast recognition over fake depth.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Spot whether the problem is a chain rule, product rule, or quotient rule situation.",
                "See the standard move before the algebra gets loud.",
                "Use memory hooks to survive quizzes and exam reviews.",
                "Study on mobile without reading a wall of text.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/85 p-4 text-sm leading-6 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <CourseCoverageChart />
        </section>

        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Sample bubbles
              </p>
              <h2 className="mt-2 font-display text-4xl text-slate-900">
                Three cards, same teaching pattern.
              </h2>
            </div>
            <Link
              href="/topics"
              className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
            >
              Browse all topics
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {sampleCards.map((card) => (
              <Link
                key={card.id}
                href={`/topics/${card.id}`}
                className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 transition hover:-translate-y-1"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {card.course} • {card.unit}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                  {card.name}
                </h3>
                <div className="mt-5">
                  <MathConceptVisual card={card} mode="card" />
                </div>
                <div className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Use it when:
                    </span>{" "}
                    {card.useItWhen}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Do this:
                    </span>{" "}
                    {card.doThis}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Remember:
                    </span>{" "}
                    {card.rememberThis}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
