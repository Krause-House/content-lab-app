import BannerImage from "~/components/BannerImage";
import PageHeader from "~/components/PageHeader";

export default function Home() {
  return (
    <div className="">
      <BannerImage isLive />
      <main className="max-w-7xl mx-auto px-4">
        <PageHeader />
      </main>
    </div>
  );
}
