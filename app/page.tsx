import BannerImage from "~/components/BannerImage";
import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import ActiveHost from "~/components/Hosts/ActiveHost";
import getCurrentUser from "~/lib/getCurrentUser";
import fetchHosts from "~/lib/fetchHosts";

const getUser = async () => {
  const user = await getCurrentUser();
  return { user };
};

const getHosts = async () => {
  const { data: hosts } = await fetchHosts();
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
        <ActiveHost
          hostsName={`${
            hosts?.length ?? 0 > 0
              ? hosts?.sort((host) => host.against.length - host.for.length)[0]
                  .displayName + " & "
              : ""
          }Uncle Jon`}
        />
        <HostVoting user={user} hosts={hosts ?? []} />
      </main>
    </>
  );
}
