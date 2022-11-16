import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";

type SuggestionData = {
  id: number;
  title: string;
  likes: number;
  isLiked: boolean;
  likedBy: {
    id: number;
    name: string;
    imageUrl: string;
  }[];
};

export default function Suggestion({ data }: { data: SuggestionData }) {
  return (
    <a href="#" className="block bg-white ">
      <div className="flex items-center py-4 px-4 sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="">
            <h4 className="truncate font-medium text-primary-500 text-base">
              {data.title}
            </h4>
            <div className="mt-3 flex gap-2 text-gray-500 text-sm items-center">
              <div className="hidden sm:flex -space-x-1">
                {data.likedBy.map((user) => (
                  <Image
                    width={24}
                    height={24}
                    key={user.id}
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-gray-50"
                    src={user.imageUrl}
                    alt={user.name}
                  />
                ))}
              </div>
              <p>{data.likes} fans want to see this</p>
            </div>
          </div>
        </div>
        <div className="mx-2 flex-shrink-0 flex items-center gap-1  font-medium">
          {data.isLiked ? (
            <HeartIconSolid className="w-auto h-6 text-primary-200" />
          ) : (
            <HeartIcon className="h-6 w-auto text-gray-500 hover:text-primary-200 transition" />
          )}
        </div>
      </div>
    </a>
  );
}
