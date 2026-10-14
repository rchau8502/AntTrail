import { RecognitionQuiz } from "@/components/recognition-quiz";
import { SiteHeader } from "@/components/site-header";
import { allCards } from "@/lib/bubble";

interface QuizPageProps {
  searchParams?: Promise<{
    focus?: string;
  }>;
}

export default async function QuizPage({ searchParams }: QuizPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <RecognitionQuiz cards={allCards} initialCardId={params?.focus} />
      </main>
    </div>
  );
}
