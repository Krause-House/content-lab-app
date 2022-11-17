import Suggestion from "~/components/Suggestions/Suggestion";
import NewSuggestionButton from "~/components/Suggestions/NewSuggestionButton";

const suggestions = [
  {
    id: 1,
    title: "Boosh",
    likes: 21,
    isLiked: false,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl: "/assets/avatars/jon.jpeg",
      },
      {
        id: 2,
        name: "Kristin Watson",
        imageUrl: "/assets/avatars/mario.jpeg",
      },
      {
        id: 3,
        name: "Emma Dorsey",
        imageUrl: "/assets/avatars/crabtree.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Flex",
    likes: 10,
    isLiked: false,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl: "/assets/avatars/commodore.jpeg",
      },
      {
        id: 2,
        name: "Kristin Watson",
        imageUrl: "/assets/avatars/flex.jpeg",
      },
      {
        id: 3,
        name: "Emma Dorsey",
        imageUrl: "/assets/avatars/boosh.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Crabtree",
    likes: 4,
    isLiked: true,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl: "/assets/avatars/crabtree.jpg",
      },
      {
        id: 1,
        name: "Emily Selman",
        imageUrl: "/assets/avatars/glad.png",
      },
      {
        id: 3,
        name: "Emma Dorsey",
        imageUrl: "/assets/avatars/greg.jpeg",
      },
    ],
  },
  {
    id: 4,
    title: "greg",
    likes: 2,
    isLiked: false,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl: "/assets/avatars/lewwwk.png",
      },
      {
        id: 2,
        name: "Kristin Watson",
        imageUrl: "/assets/avatars/boosh.jpg",
      },
    ],
  },
];

export default function HostVoting() {
  return (
    <div className="my-8 bg-white rounded-md shadow">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
          <div className="mt-4 ml-4">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              Co-Host Leaderboard
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Upvote and downvote hosts to influence who&apos;s on stage. The
              leader will be the co-host until they fall out of first place.
            </p>
          </div>
          <div className="flex-shrink-0 mt-4 ml-4">
            <NewSuggestionButton />
          </div>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <Suggestion data={suggestion} />
          </li>
        ))}
      </ul>
    </div>
  );
}
