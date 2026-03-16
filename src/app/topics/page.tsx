import { SiteHeader } from "@/components/site-header";
import { TopicExplorer } from "@/components/topic-explorer";
import { allCards } from "@/lib/bubble";

export default function TopicsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <TopicExplorer cards={allCards} />
      </main>
    </div>
  );
}
