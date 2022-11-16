import Suggestion from "~/components/Suggestions/Suggestion";
import NewSuggestionButton from "~/components/Suggestions/NewSuggestionButton";

const suggestions = [
  {
    id: 1,
    title: "Jon should sing play-by-play commentary for a quarter",
    likes: 23,
    isLiked: false,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 2,
        name: "Kristin Watson",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 3,
        name: "Emma Dorsey",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 2,
    title: "Bring Ty Lawson on stage",
    likes: 23,
    isLiked: false,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 2,
        name: "Kristin Watson",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 3,
        name: "Emma Dorsey",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 3,
    title: "Make Crabtree fourth quarter host",
    likes: 23,
    isLiked: true,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 2,
        name: "Kristin Watson",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 3,
        name: "Emma Dorsey",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 4,
    title: "Make Crabtree fourth quarter host",
    likes: 23,
    isLiked: true,
    likedBy: [
      {
        id: 1,
        name: "Emily Selman",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 2,
        name: "Kristin Watson",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 3,
        name: "Emma Dorsey",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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
              Fans' Voice
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
