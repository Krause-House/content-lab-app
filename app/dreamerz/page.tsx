import ActionBanner from "~/components/ActionBanner";
import BannerImage from "~/components/BannerImage";
import Leaderboard from "~/components/LeaderboardList";
import PageHeader from "~/components/PageHeader";
import createClient from "~/util/supabase-server";

export default async function Dreamerz() {
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
    supabase
      .from("contests")
      .select()
      .eq("created_by", 2)
      .eq("is_visible", true),
    supabase.from("candidates").select(),
  ]);

  return (
    <>
      {!user?.email && (
        <ActionBanner text="Sign in to build this week's YNG Dreamerz x NBA watch party!" />
      )}
      {/* <ActionBanner text="Voting has ended for this week. The podcast will be sent to your email soon." /> */}
      <div className="hidden sm:block">
        <BannerImage imageUrl="/assets/dreamerz_banner.png" />
      </div>
      <main className="relative px-4 mx-auto max-w-7xl">
        <PageHeader
          title="YNG Dreamerz Watch Party"
          description="The YNG Dreamerz fanbase will be tuning into the NBA this Friday, and you'll be in the driver's seat. What game should we watch? What pizza should we order the hosts? It's up to you. Plus, refer your friends to win a custom basketball."
          //   shareLink={shareLink}
          //   primaryButton={<ListenButton />}
        />
        {/* {user?.email && (
          <ReferralCard
            title="Win a custom basketball"
            creatorIdToSubscribeTo="2"
            referredByEmail={user?.email}
            redirectTo="/dreamerz"
            description="Copy and share your referral link with friends. Whoever invites the most people by Thursday night will win a custom basketball."
          />
        )} */}
        <div className="flex flex-col">
          {contests
            ?.sort((a, b) => a.id - b.id)
            .map((contest, idx) => (
              <Leaderboard
                key={idx}
                user={user}
                candidates={
                  candidates?.filter(
                    (candidate) => candidate.contest_id === contest.id
                  ) ?? []
                }
                contest={contest}
              />
            ))}
        </div>
      </main>
    </>
  );
}
