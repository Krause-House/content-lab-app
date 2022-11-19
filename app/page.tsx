import BannerImage from "~/components/BannerImage";
import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import ActiveHost from "~/components/Hosts/ActiveHost";
import SuggetionForm from "~/components/Hosts/SuggestionForm";

export default function Home() {
  return (
    <div className="mt-16">
      <BannerImage />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        <ActiveHost />
        <HostVoting />
      </main>
    </div>
  );
}
