import Link from "next/link";

import { HomeStudyToday } from "@/components/home-study-today";
import { SiteHeader } from "@/components/site-header";
import { allCards, getDashboardStats } from "@/lib/bubble";
import { courseCatalog, getPrimaryCourseCode } from "@/lib/course-catalog";
import { getCourseGuide } from "@/lib/course-guides";

const evidenceSignals = [
  {
    title: "Retrieve before reveal",
    body: "Good study starts with an attempt, not a passive read-through.",
  },
  {
    title: "Repair weak topics explicitly",
    body: "Misses should become targeted repair work, not vague motivation.",
  },
  {
    title: "Mix problem types",
    body: "Interleaving trains recognition, not just execution after the method is handed to you.",
  },
  {
    title: "Return later",
    body: "If a topic never comes back, you are practicing exposure, not retention.",
  },
] as const;

const loops = [
  {
    title: "Study",
    label: "Main loop",
    href: "/study",
    body: "Attempt a topic, reveal the structure, compare against a worked path, then mark whether it is stable or needs repair.",
  },
  {
    title: "Bubblegum",
    label: "Repair loop",
    href: "/bubblegum",
    body: "Use this after mistakes. Bubblegum should isolate one topic, diagnose the miss, and make you chew through it.",
  },
  {
    title: "Quiz",
    label: "Recall loop",
    href: "/quiz",
    body: "Use interleaved recognition checks when you need to identify the method before solving.",
  },
] as const;

const scorecardLabels = [
  { key: "Courses", field: "courses" },
  { key: "Cards", field: "totalCards" },
  { key: "Units", field: "units" },
  { key: "Starter", field: "starterCards" },
] as const;

export default function Home() {
  const stats = getDashboardStats();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="paper-panel bubble-shadow relative overflow-hidden rounded-[2.4rem] border border-[color:var(--line)] p-6 sm:p-8 lg:p-10">
          <div className="study-grid absolute inset-0 opacity-40" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#4156d8]">
                Evidence-backed study system
              </div>
              <div className="space-y-4">
                <h1 className="ink-title max-w-[11ch] font-display text-[clamp(3.1rem,8vw,6rem)] leading-[0.95] text-slate-950">
                  Learn math by attempting, diagnosing, and returning.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                  Bubble is no longer supposed to be a catalog of hints. It is
                  supposed to help you solve, understand why a method fits,
                  repair weak topics, and bring the right material back before
                  you forget it.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {loops.map((loop) => (
                  <Link
                    key={loop.title}
                    href={loop.href}
                    className="accent-chip rounded-[1.6rem] border border-[color:var(--line)] bg-white/94 p-5 transition hover:-translate-y-1 hover:border-[#8da2ff]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                      {loop.label}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-950">{loop.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      {loop.body}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="diagnostic-panel rounded-[1.9rem] border border-[color:var(--line)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                What this rebuild optimizes for
              </p>
              <div className="mt-4 grid gap-3">
                {evidenceSignals.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.2rem] border border-[color:var(--line)] bg-white/92 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {scorecardLabels.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-[1.15rem] border border-[color:var(--line)] bg-white px-4 py-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                      {item.key}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-950">
                      {stats[item.field]}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <HomeStudyToday cards={allCards} />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-[#f8fbff] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
              Study sequence
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "1. Attempt the problem before revealing help.",
                "2. Diagnose whether the miss was recognition, setup, execution, or proof.",
                "3. Compare against a worked structure, not just a final answer.",
                "4. Retry the topic, then let it come back later through review.",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-[1.2rem] border border-[color:var(--line)] bg-white/92 px-4 py-4 text-sm leading-6 text-slate-800"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] bg-[#fffaf0] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b5d08]">
              What each page is for
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "Study: one-topic workspace with attempt, reveal ladder, explanation, and next action.",
                "Bubblegum: explicit repair loop after a miss.",
                "Quiz: mixed recognition checks to train method selection.",
                "Courses: what that class tests, what is due, and what is slipping.",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-[1.2rem] border border-[color:var(--line)] bg-white/92 px-4 py-4 text-sm leading-6 text-slate-800"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="courses" className="grid gap-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                Courses
              </p>
              <h2 className="ink-title mt-2 font-display text-4xl text-slate-950">
                Open the exact class and see what it demands.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
              Each course page should now behave like a study command center:
              due topics, common misses, and the patterns that show up on actual
              exams.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {courseCatalog.map((course) => {
              const code = course.courseCodes?.[0] ?? getPrimaryCourseCode(course.title);
              const guide = getCourseGuide(course.id);

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="paper-panel bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] p-6 transition hover:-translate-y-1 hover:border-[#8da2ff]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                      {code}
                    </span>
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                      {course.cardCount} cards
                    </span>
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                      {course.unitCount} units
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-semibold text-slate-950">
                    {course.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {course.shortDescription}
                  </p>

                  {guide ? (
                    <div className="mt-5 grid gap-3">
                      <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-white/92 px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                          Exam frame
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-800">
                          {guide.overview.en}
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] border border-[color:var(--line)] bg-white/92 px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4156d8]">
                          Solve focus
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-800">
                          {guide.survivalAdvice.en}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-950">Open course</span>
                    <span className="text-xl text-[#4156d8]">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
