import ActionBanner from "~/components/ActionBanner";
import BannerImage from "~/components/BannerImage";
import { PrimaryButton } from "~/components/Buttons";
import Leaderboard from "~/components/Leaderboard";
import PageHeader from "~/components/PageHeader";
import ShareCard from "~/components/ShareCard";
import createClient from "~/util/supabase-server";

const shareLink = `http://twitter.com/intent/tweet?text=${"Vote on which players and games to cover in this week's Around the Association podcast! @WatchGameday".replace(
  " ",
  "%20"
)}&url=https%3A%2F%2Fgameday.watch/weekly%2F`;

function ListenButton() {
  return (
    <a
      href="https://open.spotify.com/show/3YadlLpwrMTOG0ecvX65bw?si=18d05d20368444cf"
      target="_blank"
      rel="noreferrer noopener"
    >
      <PrimaryButton>Listen</PrimaryButton>
    </a>
  );
}

export default async function Weekly() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: contests } = await supabase.from("contests").select();
  const { data: candidates } = await supabase.from("candidates").select();

  return (
    <>
      <ActionBanner text="Voting has ended for this week! Check back Thursday for another round of options." />
      <div className="hidden sm:block">
        <BannerImage imageUrl="/assets/weekly_banner.png" />
      </div>
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader
          title="Around the Association Weekly"
          description="Vote on the segments for this week's Around the Association weekly episode. The winning players and games will be broken down for all to hear."
          shareLink={shareLink}
          primaryButton={<ListenButton />}
        />
        <ShareCard
          shareLink={shareLink}
          description="Share Around the Association Weekly with friends to get more voting power next week. Tweet using @WatchGameday and every like and retweet will increase your future voting power."
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
            votingOpen={false}
            contest={contest}
          />
        ))}
      </main>
    </>
  );
}
