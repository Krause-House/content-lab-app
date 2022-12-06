import HostVoting from "~/components/HostVoting";
import Leaderboard from "~/components/Leaderboard";
import PageHeader from "~/components/PageHeader";
import createClient from "~/util/supabase-server";

export default async function Weekly() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: contests } = await supabase.from("contests").select();
  const { data: candidates } = await supabase.from("candidates").select();

  return (
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
      {contests?.map((contest) => (
        <Leaderboard
          user={user}
          candidates={
            candidates?.filter(
              (candidate) => contest.id === candidate.contest_id
            ) ?? []
          }
          contest={contest}
        />
      ))}
    </main>
  );
}
