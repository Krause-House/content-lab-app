import HostVoting from "~/components/HostVoting";
import PageHeader from "~/components/PageHeader";
import createClient from "~/util/supabase-server";

export default async function Gameday() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: hosts } = await supabase.from("hosts").select();

  return (
    <>
      <iframe
        src="https://playback.tv/krausehouse"
        className="w-screen h-[800px]"
      />
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader />
        {/* <ActiveHost
          isLive
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
        /> */}
        <HostVoting user={user} initialHosts={hosts ?? []} />
      </main>
    </>
  );
}
