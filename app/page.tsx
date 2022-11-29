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
      <BannerImage />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        <ActiveHost
          hostsName={`${
            hosts?.length ?? 0 > 0
              ? hosts?.sort(
                  (host1, host2) =>
                    host2.for.length -
                    host2.against.length -
                    (host1.for.length - host1.against.length)
                )[0].displayName + " & "
              : ""
          }Uncle Jon`}
        />
        <HostVoting user={user} initialHosts={hosts ?? []} />
      </main>
    </>
  );
}
