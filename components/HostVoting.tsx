"use client";
import HostListItem from "~/components/Hosts/HostListItem";
import HostButton from "~/components/Hosts/HostButton";
import Card from "~/components/Card";
import supabase from "~/util/supabaseClient";
import { useRouter } from "next/navigation";
import HostData from "~/types/HostData";
import User from "~/types/User";

export default function HostVoting({
  user,
  hosts,
}: {
  user: User | null;
  hosts: HostData[];
}) {
  const router = useRouter();

  supabase.auth.onAuthStateChange((event, session) => {
    router.refresh();
  });

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
          .sort((host) => host.against.length - host.for.length)
          .map((host: HostData) => (
            <li key={host.id}>
              <HostListItem userId={user?.id ?? null} host={host} />
            </li>
          ))}
      </ul>
    </Card>
  );
}
