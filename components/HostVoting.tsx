"use client";
import HostListItem from "~/components/Hosts/HostListItem";
import HostButton from "~/components/Hosts/HostButton";
import Card from "~/components/Card";
import supabase from "~/util/supabaseClient";
import { useRouter } from "next/navigation";
import HostData from "~/types/HostData";
import User from "~/types/User";
import { useCallback, useState } from "react";
import setVote, { VOTE } from "~/lib/setVote";

const update = async (host: HostData, userId: string, vote: VOTE) => {
  return await setVote(host, userId, vote);
};

export default function HostVoting({
  user,
  initialHosts,
}: {
  user: User | null;
  initialHosts: HostData[];
}) {
  const router = useRouter();
  const [hosts, setHosts] = useState(initialHosts);

  const vote = async (host: HostData, vote: VOTE) => {
    let originalHosts = hosts;
    try {
      if (user?.id) {
        setHosts([
          ...hosts.filter((h) => h.id !== host.id),
          {
            ...host,
            for:
              vote === VOTE.FOR
                ? [...host.for.filter((id) => id !== user.id), user.id]
                : host.for.filter((id) => id !== user.id),
            against:
              vote === VOTE.AGAINST
                ? [...host.against.filter((id) => id !== user.id), user.id]
                : host.against.filter((id) => id !== user.id),
          },
        ]);
        await update(host, user?.id, vote);
      } else throw new Error("User is not logged in");
    } catch (e) {
      console.error(e);
      setHosts(originalHosts);
    }
  };

  supabase.auth.onAuthStateChange((event, session) => {
    router.refresh();
  });

  supabase
    .channel("host-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "hosts" },
      (payload) => {
        setHosts([
          ...hosts.filter((host) => host.id !== (payload.new as HostData).id),
          payload.new as HostData,
        ]);
      }
    )
    .subscribe();

  return (
    <Card className="my-8 bg-tan">
      <div className="px-4 py-5 border-b border-gray-300 sm:px-6">
        <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
          <div className="mt-4 ml-4">
            <h2 className="text-gray-900">Leaderboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              Upvote and downvote hosts to influence who&apos;s on stage. The
              leader will be the co-host until they fall out of first place.
            </p>
          </div>
          {user && !hosts.find((host) => host.user == user.id) && (
            <div className="flex-shrink-0 mt-4 ml-4">
              <HostButton />
            </div>
          )}
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-300">
        {hosts
          .sort(
            (host1, host2) =>
              host2.for.length -
              host2.against.length -
              (host1.for.length - host1.against.length)
          )
          .map((host: HostData) => (
            <li key={host.id}>
              <HostListItem
                userId={user?.id ?? null}
                host={host}
                vote={(_vote) => vote(host, _vote)}
              />
            </li>
          ))}
      </ul>
    </Card>
  );
}
