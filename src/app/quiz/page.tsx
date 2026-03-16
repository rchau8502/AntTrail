import { RecognitionQuiz } from "@/components/recognition-quiz";
import { SiteHeader } from "@/components/site-header";
import { calcOneCards } from "@/lib/bubble";

export default function QuizPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <RecognitionQuiz cards={calcOneCards} />
      </main>
    </div>
  );
}
