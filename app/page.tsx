import BannerImage from "~/components/BannerImage";
import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import ActiveHost from "~/components/Hosts/ActiveHost";
import getCurrentUser from "~/lib/getCurrentUser";

export const getUser = async () => {
  return await getCurrentUser();
};

export default async function Home() {
  const user = await getUser();
  return (
    <>
      <BannerImage isLive />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        <ActiveHost />
        <HostVoting user={user} />
      </main>
    </>
  );
}
