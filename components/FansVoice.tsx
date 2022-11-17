import Suggestion from "~/components/Suggestions/Suggestion";
import NewSuggestionButton from "~/components/Suggestions/NewSuggestionButton";

const suggestions = [
  {
    id: 1,
    title: "Jon should sing play-by-play commentary for a quarter",
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
    title: "Bring Ty Lawson on stage",
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
    title: "Make Crabtree fourth quarter host",
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
    title: "Do something cool",
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

export default function FansVoice() {
  return (
    <div className="my-8 bg-white rounded-md shadow">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
          <div className="mt-4 ml-4">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              Fans&apos; Voice
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit quam
              corrupti consectetur.
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
