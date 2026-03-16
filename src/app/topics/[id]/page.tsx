import Link from "next/link";
import { notFound } from "next/navigation";

import { MathConceptVisual } from "@/components/math-concept-visual";
import { SiteHeader } from "@/components/site-header";
import { allCards, getAdjacentCards, getCardById, getRelatedCards } from "@/lib/bubble";
import { getPatternTokens, getRecognitionPrompt } from "@/lib/recognition";

interface TopicDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const supportSections = [
  ["Use it when", "useItWhen"],
  ["Think of it as", "thinkOfItAs"],
  ["Watch out for", "watchOutFor"],
  ["Remember this", "rememberThis"],
] as const;

export function generateStaticParams() {
  return allCards.map((card) => ({
    id: card.id,
  }));
}

export async function generateMetadata({ params }: TopicDetailPageProps) {
  const { id } = await params;
  const card = getCardById(id);

  if (!card) {
    return {};
  }

  return {
    title: `${card.name} | Bubble`,
    description: card.rememberThis,
  };
}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const { id } = await params;
  const card = getCardById(id);

  if (!card) {
    notFound();
  }

  const relatedCards = getRelatedCards(card.id);
  const { previous, next } = getAdjacentCards(card.id);
  const recognitionPrompt = getRecognitionPrompt(card);
  const patternTokens = getPatternTokens(card);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_22rem]">
          <article className="space-y-6">
            <div className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                <Link href="/topics" className="hover:text-sky-900">
                  Topics
                </Link>
                <span>•</span>
                <span>{card.course}</span>
                <span>•</span>
                <span>{card.unit}</span>
                <span className="rounded-full bg-sky-100 px-3 py-1 tracking-normal">
                  {card.difficulty}
                </span>
              </div>

              <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,24rem)]">
                <div>
                  <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
                    {card.name}
                  </h1>
                  <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                    {card.memoryHook}
                  </p>
                </div>
                <MathConceptVisual card={card} mode="detail" />
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,22rem)]">
                <section className="rounded-[1.85rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,249,255,0.94))] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                      Recognition board
                    </p>
                    <span className="rounded-full border border-[color:var(--line)] bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                      Spot the shape first
                    </span>
                  </div>

                  <div className="mt-4 rounded-[1.6rem] border border-sky-100 bg-slate-950 px-5 py-5 text-left text-[1.05rem] leading-8 text-sky-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:text-[1.2rem]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300/80">
                      Problem-like cue
                    </p>
                    <p className="mt-3 font-mono text-balance">
                      {recognitionPrompt}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(16rem,18rem)]">
                    <div className="rounded-[1.55rem] border border-[color:var(--line)] bg-white/90 p-5">
                      <p className="text-sm font-semibold text-sky-700">
                        Looks like
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {patternTokens.map((token) => (
                          <span
                            key={token}
                            className="rounded-full border border-sky-100 bg-sky-50 px-3 py-2 font-mono text-sm text-sky-950"
                          >
                            {token}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.55rem] border border-emerald-100 bg-[linear-gradient(180deg,rgba(214,255,232,0.7),rgba(255,255,255,0.94))] p-5">
                      <p className="text-sm font-semibold text-sky-700">
                        First move
                      </p>
                      <p className="mt-3 text-base leading-7 text-slate-800">
                        {card.doThis}
                      </p>
                    </div>
                  </div>
                </section>

                <div className="grid gap-4">
                  <section className="rounded-[1.75rem] border border-rose-100 bg-[linear-gradient(180deg,rgba(255,240,240,0.95),rgba(255,255,255,0.96))] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
                      Trap
                    </p>
                    <p className="mt-3 text-base leading-7 text-slate-800">
                      {card.watchOutFor}
                    </p>
                  </section>

                  <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/90 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                      Keep in mind
                    </p>
                    <p className="mt-3 text-base leading-7 text-slate-800">
                      {card.useItWhen}
                    </p>
                    <div className="mt-4 rounded-[1.35rem] bg-sky-50/80 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                        Memory hook
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {card.rememberThis}
                      </p>
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {supportSections.map(([label, key]) => (
                  <section
                    key={label}
                    className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-5"
                  >
                    <p className="text-sm font-semibold text-sky-700">{label}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {card[key]}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Problem shapes
                  </p>
                  <div className="mt-4 grid gap-3">
                    {card.typicalProblemShapes.map((shape, index) => (
                      <div
                        key={shape}
                        className="rounded-[1.5rem] border border-[color:var(--line)] bg-sky-50/80 px-5 py-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                          Shape {index + 1}
                        </p>
                        <p className="mt-3 text-base leading-7 text-slate-800">
                          {shape}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {card.quickExample ? (
                  <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(214,255,232,0.7),rgba(255,255,255,0.95))] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                      Try this shape
                    </p>
                    <div className="mt-4 rounded-[1.5rem] bg-slate-950 px-4 py-4 text-sky-50">
                      <p className="font-mono text-[1.02rem] leading-8">
                        {card.quickExample.problem}
                      </p>
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      Move
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {card.quickExample.move}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(214,255,232,0.7),rgba(255,255,255,0.95))] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                      Think of it as
                    </p>
                    <p className="mt-4 text-base leading-7 text-slate-800">
                      {card.thinkOfItAs}
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Recognition checks
                </p>
                <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                  Ask: what rule fits first?
                </span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {card.miniDrill.map((item, index) => (
                  <div
                    key={item.prompt}
                    className="rounded-[1.75rem] border border-[color:var(--line)] bg-white p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                      Check {index + 1}
                    </p>
                    <p className="mt-3 text-base font-semibold leading-7 text-slate-900">
                      {item.prompt}
                    </p>
                    <p className="mt-4 rounded-[1.3rem] bg-sky-50/80 px-4 py-4 text-sm leading-6 text-[color:var(--muted)]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bubble-shadow flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-[color:var(--line)] bg-white/90 p-6">
              <div className="flex flex-wrap gap-3">
                {previous ? (
                  <Link
                    href={`/topics/${previous.id}`}
                    className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                  >
                    ← {previous.name}
                  </Link>
                ) : null}
                {next ? (
                  <Link
                    href={`/topics/${next.id}`}
                    className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                  >
                    {next.name} →
                  </Link>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/study"
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
                >
                  Study this
                </Link>
                <Link
                  href="/quiz"
                  className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-200"
                >
                  Quiz mode
                </Link>
              </div>
            </section>
          </article>

          <aside className="space-y-6">
            <MathConceptVisual card={card} mode="detail" />

            <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                Card data
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3">
                  {card.course}
                </div>
                <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3">
                  {card.chapter}
                </div>
                <div className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3">
                  {card.topic}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs text-[color:var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                Related in {card.unit}
              </p>
              <div className="mt-4 grid gap-3">
                {relatedCards.map((related) => (
                  <Link
                    key={related.id}
                    href={`/topics/${related.id}`}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-white px-4 py-4 transition hover:border-sky-200"
                  >
                    <p className="font-semibold text-slate-900">{related.name}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      {related.memoryHook}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}
