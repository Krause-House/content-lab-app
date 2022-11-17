import BannerImage from "~/components/BannerImage";
import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import ActiveHost from "~/components/Suggestions/ActiveHost";
import SuggetionForm from "~/components/Suggestions/SuggestionForm";

export default function Home() {
  return (
    <div className="mt-16">
      <BannerImage isLive />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        <ActiveHost />
        <HostVoting />
      </main>
    </div>
  );
}
