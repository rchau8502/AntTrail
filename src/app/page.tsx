import Link from "next/link";

import { HomeStudyToday } from "@/components/home-study-today";
import { SiteHeader } from "@/components/site-header";
import { courseCatalog, getPrimaryCourseCode } from "@/lib/course-catalog";
import { allCards, getDashboardStats } from "@/lib/bubble";
import { getCourseGuide } from "@/lib/course-guides";

const launchModes = [
  {
    href: "/study",
    eyebrow: "Main workspace",
    title: "Study",
    body: "Start here when you need a focused review block with the topic signal, the review move, and a starter drill.",
  },
  {
    href: "/bubblegum",
    eyebrow: "Repair lab",
    title: "Bubblegum",
    body: "Go here after mistakes. Bubblegum is for weak-topic repair, not broad review.",
  },
  {
    href: "/topics",
    eyebrow: "Reference layer",
    title: "Topics",
    body: "Use this when you already know what you need and want the exact topic page fast.",
  },
] as const;

const problemRoutes = [
  {
    title: "I have a problem in front of me",
    body: "Open Topics if you need the exact page fast, or Study if you need guided review before solving.",
  },
  {
    title: "I keep missing one topic",
    body: "Go straight to Bubblegum. That is the repair loop.",
  },
  {
    title: "I need a review plan tonight",
    body: "Open your course page, then use Study for the main review block and Bubblegum for weak spots.",
  },
] as const;

const sessionPresets = [
  {
    href: "/study",
    title: "15-minute review",
    body: "Use Study to run one focused review block and clear one or two topics properly.",
  },
  {
    href: "/quiz",
    title: "Pre-quiz recall",
    body: "Use Quiz for short recognition reps when you need fast recall before class or a quiz.",
  },
  {
    href: "/bubblegum",
    title: "Weak-topic repair",
    body: "Use Bubblegum after mistakes to repair the exact topic that keeps costing you points.",
  },
] as const;

export default function Home() {
  const stats = getDashboardStats();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="paper-panel bubble-shadow relative overflow-hidden rounded-[2rem] border border-[color:var(--line)] p-6 sm:p-8 lg:p-10">
          <div className="bubble-stage absolute inset-0 opacity-60" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_22rem]">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8b3725]">
                Focused study app
              </div>
              <div className="space-y-4">
                <h1 className="ink-title max-w-[11ch] font-display text-[clamp(3.2rem,8vw,6.1rem)] leading-[0.98] text-slate-900">
                  Study with less noise and more traction.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                  Bubble is a focused study app for your four math courses. It
                  should help you review faster, practice the right patterns,
                  and keep weak topics visible before they cost you points.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {launchModes.map((mode) => (
                  <Link
                    key={mode.href}
                    href={mode.href}
                    className="accent-ring rounded-[1.5rem] border border-[color:var(--line)] bg-white/92 p-5 transition hover:-translate-y-1"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                      {mode.eyebrow}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                      {mode.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      {mode.body}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="space-y-4 rounded-[1.75rem] border border-[color:var(--line)] bg-[rgba(255,252,248,0.92)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                What this version optimizes for
              </p>
              <div className="grid gap-3 text-sm leading-6 text-slate-700">
                <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-3">
                  Faster study sessions with clearer priorities.
                </div>
                <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-3">
                  Shorter path from confusion to useful review.
                </div>
                <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-3">
                  One focused workspace for each of your four classes.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Cards
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {stats.totalCards}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Starter cards
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {stats.starterCards}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Courses
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {stats.courses}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Units
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">
                    {stats.units}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {problemRoutes.map((route, index) => (
            <div
              key={route.title}
              className={`bubble-shadow rounded-[1.75rem] border p-6 ${
                index === 0
                  ? "border-[#d6b5aa] bg-[#fff8f4]"
                  : index === 1
                    ? "border-[#e9d7a8] bg-[#fff9e9]"
                    : "border-[#cfe4d9] bg-[#f5fbf7]"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                Use case
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                {route.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {route.body}
              </p>
            </div>
          ))}
        </section>

        <HomeStudyToday cards={allCards} />

        <section className="paper-panel bubble-shadow rounded-[2rem] border border-[color:var(--line)] p-6 sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                Session presets
              </p>
              <h2 className="ink-title mt-2 font-display text-4xl text-slate-900">
                Start a study block without deciding from scratch.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
              These are the three study sessions Bubble should support best: guided review, short recall, and exact repair.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {sessionPresets.map((preset) => (
              <Link
                key={preset.href}
                href={preset.href}
                className="rounded-[1.6rem] border border-[color:var(--line)] bg-white/92 p-5 transition hover:-translate-y-1 hover:border-[#c77964]"
              >
                <h3 className="text-2xl font-semibold text-slate-900">
                  {preset.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {preset.body}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="courses" className="grid gap-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                Courses
              </p>
              <h2 className="ink-title mt-2 font-display text-4xl text-slate-900">
                Open the exact class. Study the exact material.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
              Every course card below tells you what that class demands, what
              to review first, and where to go when you start slipping.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {courseCatalog.map((course) => {
              const guide = getCourseGuide(course.id);
              const code = course.courseCodes?.[0] ?? getPrimaryCourseCode(course.title);

              return (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="paper-panel bubble-shadow rounded-[1.9rem] border border-[color:var(--line)] p-6 transition hover:-translate-y-1 hover:border-[#c77964]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                      {code}
                    </span>
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                      {course.cardCount} cards
                    </span>
                    <span className="rounded-full border border-[color:var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--muted)]">
                      {course.unitCount} units
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-semibold text-slate-900">
                    {course.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {course.shortDescription}
                  </p>

                  {guide ? (
                    <div className="mt-5 grid gap-3">
                      <div className="rounded-[1.3rem] border border-[color:var(--line)] bg-white/92 px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                          Exam trigger
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-800">
                          {guide.overview.en}
                        </p>
                      </div>
                      <div className="rounded-[1.3rem] border border-[color:var(--line)] bg-[#fffdfa] px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                          Study focus
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-800">
                          {guide.survivalAdvice.en}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">
                      Open course dashboard
                    </span>
                    <span className="text-xl text-[#8b3725]">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="paper-panel bubble-shadow rounded-[2rem] border border-[color:var(--line)] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3725]">
                Study system
              </p>
              <h2 className="ink-title mt-2 font-display text-4xl text-slate-900">
                A better study flow than random clicking.
              </h2>
            </div>
            <div className="grid gap-3">
              {[
                "1. Pick the course you are actually taking.",
                "2. Use Topics when you need the exact page, Study when you need guided review, Bubblegum when you need repair.",
                "3. Work the course dashboard, then tighten weak spots before the next quiz or exam.",
                "4. Keep weak topics local and come back to them before the next quiz or exam.",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/90 px-4 py-4 text-sm leading-6 text-slate-800"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
