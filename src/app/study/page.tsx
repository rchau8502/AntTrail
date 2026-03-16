import { SiteHeader } from "@/components/site-header";
import { StudyMode } from "@/components/study-mode";
import { calcOneCards } from "@/lib/bubble";

export default function StudyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StudyMode cards={calcOneCards} />
      </main>
    </div>
  );
}
