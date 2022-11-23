import BannerImage from "~/components/BannerImage";
import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import ActiveHost from "~/components/Hosts/ActiveHost";
import getCurrentUser from "~/lib/getCurrentUser";

const getUser = async () => {
  const user = await getCurrentUser();
  return { user };
};

const getHosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/hosts`, {
    cache: "no-store",
  });
  const hosts = await res.json();
  return { hosts };
};

export default async function Home() {
  const { user } = await getUser();
  const { hosts } = await getHosts();

  return (
    <>
      <BannerImage isLive />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        <ActiveHost />
        <HostVoting signedIn={!!user} hosts={hosts} />
      </main>
    </>
  );
}
