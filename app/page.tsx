import BannerImage from "~/components/BannerImage";
import FansVoice from "~/components/FansVoice";
import PageHeader from "~/components/PageHeader";
import ActiveSuggestion from "~/components/Suggestions/ActiveSuggestion";

export default function Home() {
  return (
    <div className="">
      <BannerImage isLive />
      <main className="max-w-7xl mx-auto px-4">
        <PageHeader />
        <ActiveSuggestion />
        <FansVoice />
      </main>
    </div>
  );
}
