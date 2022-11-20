import { cookies } from "next/headers";
import BannerImage from "~/components/BannerImage";
import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import ActiveHost from "~/components/Hosts/ActiveHost";
import { redirect } from "next/navigation";
import getCurrentUser from "~/util/getCurrentUser";

export const guardPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth");
  }
};

export default async function Home() {
  await guardPage();
  return (
    <>
      <BannerImage isLive />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        <ActiveHost />
        <HostVoting />
      </main>
    </>
  );
}
