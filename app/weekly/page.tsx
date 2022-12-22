import ActionBanner from "~/components/ActionBanner";
import BannerImage from "~/components/BannerImage";
import { PrimaryButton } from "~/components/Buttons";
import Leaderboard from "~/components/Leaderboard";
import PageHeader from "~/components/PageHeader";
import ShareCard from "~/components/ShareCard";
import UserDetails, { defaultUserDetails } from "~/types/UserDetails";
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

  // fetch user + data that does not require authentication
  const [
    {
      data: { user },
    },
    { data: contests },
    { data: candidates },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("contests").select(),
    supabase.from("candidates").select(),
  ]);

  // fetch user details if user is logged in
  const userDetailsRes = user?.email
    ? (await supabase.from("users").select().eq("email", user.email)).data
    : null;
  const userDetails: UserDetails =
    userDetailsRes && userDetailsRes[0]
      ? userDetailsRes[0]
      : defaultUserDetails;

  return (
    <>
      {!user?.email && (
        <ActionBanner text="Sign in to decide what gets put into this week's Around the Association!" />
      )}
      {/* <ActionBanner text="Voting has ended for this week. The podcast will be sent to your email soon." /> */}
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
        <div className="flex flex-col">
          {contests
            ?.filter((contest) => new Date(contest.end_date) > new Date())
            .map((contest, idx) => (
              <Leaderboard
                key={idx}
                user={user}
                candidates={
                  candidates?.filter(
                    (candidate) => candidate.contest_id === contest.id
                  ) ?? []
                }
                votingPower={userDetails.voting_power}
                votingOpen={true}
                contest={contest}
              />
            ))}
        </div>
      </main>
    </>
  );
}
