import { courses } from "@/lib/bubble";

export function CourseCoverageChart() {
  const maxCards = Math.max(...courses.map((course) => course.cards.length));

  return (
    <div className="bubble-shadow rounded-[2rem] border border-[color:var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(236,247,255,0.78))] p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Coverage graph
          </p>
          <h3 className="mt-2 font-display text-3xl text-slate-900">
            Cards by course
          </h3>
        </div>
        <p className="text-sm text-[color:var(--muted)]">Visual scan, not a full syllabus audit</p>
      </div>

      <div className="mt-6 space-y-4">
        {courses.map((course, index) => {
          const width = `${(course.cards.length / maxCards) * 100}%`;
          const tone =
            index === 0
              ? "from-sky-300 to-sky-500"
              : index === 1
                ? "from-amber-200 to-orange-400"
                : "from-emerald-200 to-teal-400";

          return (
            <div key={course.id} className="space-y-2">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-slate-900">{course.title}</span>
                <span className="text-[color:var(--muted)]">
                  {course.cards.length} cards • {course.units.length} units
                </span>
              </div>
              <div className="h-4 rounded-full bg-white/80 p-1">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${tone}`}
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
