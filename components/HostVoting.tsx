import Suggestion from "~/components/Hosts/HostListItem";
import HostButton from "~/components/Hosts/HostButton";
import Card from "~/components/Card";

const suggestions = [
  {
    id: 1,
    name: "Boosh",
    likes: 21,
    isLiked: false,
    avatarUrl: "/assets/avatars/boosh.jpg",
  },
  {
    id: 2,
    name: "Flex",
    likes: 10,
    isLiked: false,
    avatarUrl: "/assets/avatars/flex.jpeg",
  },
  {
    id: 3,
    name: "Crabtree",
    likes: 4,
    isLiked: true,
    avatarUrl: "/assets/avatars/crabtree.jpg",
  },
  {
    id: 4,
    name: "greg",
    likes: 2,
    isLiked: false,
    avatarUrl: "/assets/avatars/greg.jpeg",
  },
];

export default function HostVoting() {
  return (
    <Card className="my-8 bg-tan">
      <div className="px-4 py-5 border-b border-gray-300 sm:px-6">
        <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
          <div className="mt-4 ml-4">
            <h3 className="text-xl font-bold leading-6 text-gray-900">
              Leaderboard
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Upvote and downvote hosts to influence who&apos;s on stage. The
              leader will be the co-host until they fall out of first place.
            </p>
          </div>
          <div className="flex-shrink-0 mt-4 ml-4">
            <HostButton />
          </div>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-300">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <Suggestion data={suggestion} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
