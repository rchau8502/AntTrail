import { HomeView } from "@/components/home-view";
import { SiteHeader } from "@/components/site-header";
import { allCards, getDashboardStats } from "@/lib/bubble";

const sampleCards = [
  allCards.find((card) => card.id === "chain-rule"),
  allCards.find((card) => card.id === "proof-contradiction"),
  allCards.find((card) => card.id === "prob-bayes"),
].filter((card): card is (typeof allCards)[number] => Boolean(card));

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <HomeView sampleCards={sampleCards} stats={getDashboardStats()} />
    </div>
  );
}
