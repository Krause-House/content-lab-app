import BannerImage from "~/components/BannerImage";
import FansVoice from "~/components/FansVoice";
import PageHeader from "~/components/PageHeader";
import ActiveSuggestion from "~/components/Suggestions/ActiveSuggestion";
import SuggetionForm from "~/components/Suggestions/SuggestionForm";

export default function Home() {
  return (
    <div className="mt-16">
      <BannerImage isLive />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        <ActiveSuggestion />
        <FansVoice />
      </main>
    </div>
  );
}
