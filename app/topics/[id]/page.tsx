import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { TopicDetailView } from "@/components/topic-detail-view";
import { allCards, getAdjacentCards, getCardById, getRelatedCards } from "@/lib/bubble";

interface TopicDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

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

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <TopicDetailView
        card={card}
        relatedCards={relatedCards}
        previous={previous}
        next={next}
      />
    </div>
  );
}
