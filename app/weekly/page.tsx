import ActionBanner from "~/components/ActionBanner";
import BannerImage from "~/components/BannerImage";
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
    <>
      <ActionBanner
        text={
          user?.id
            ? "Click the share button to win more votes next week!"
            : "Sign in to pick this week's Around the Association segments!"
        }
      />
      <div className="hidden sm:block">
        <BannerImage imageUrl="/assets/weekly_banner.png" />
      </div>
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader
          title="Around the Association Weekly"
          description="Vote on the segments for this week's Around the Association weekly episode. The winning players and games will be broken down for all to hear."
          shareLink={`http://twitter.com/intent/tweet?text=${"Vote on the which players and games to cover in this week's Around the Association podcast!".replace(
            " ",
            "%20"
          )}&url=https%3A%2F%2Fgameday.watch/weekly%2F`}
        />
        {contests?.map((contest, idx) => (
          <Leaderboard
            key={idx}
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
    </>
  );
}
