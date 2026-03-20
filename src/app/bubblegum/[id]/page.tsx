import { notFound } from "next/navigation";

import { BubblegumMode } from "@/components/bubblegum-mode";
import { SiteHeader } from "@/components/site-header";
import { allCards, getCardById } from "@/lib/bubble";

interface BubblegumTopicPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return allCards.map((card) => ({
    id: card.id,
  }));
}

export async function generateMetadata({ params }: BubblegumTopicPageProps) {
  const { id } = await params;
  const card = getCardById(id);

  if (!card) {
    return {};
  }

  return {
    title: `${card.name} | Bubblegum`,
    description: card.rememberThis,
  };
}

export default async function BubblegumTopicPage({
  params,
}: BubblegumTopicPageProps) {
  const { id } = await params;
  const card = getCardById(id);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <BubblegumMode card={card} />
      </main>
    </div>
  );
}
