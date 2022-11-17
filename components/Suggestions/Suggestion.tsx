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
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
          <div className="">
            <h4 className="text-base font-medium truncate text-primary-500">
              {data.title}
            </h4>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
              <div className="hidden -space-x-1 sm:flex">
                {data.likedBy.map((user) => (
                  <Image
                    width={24}
                    height={24}
                    key={user.id}
                    className="inline-block w-6 h-6 rounded-full ring-2 ring-gray-50"
                    src={user.imageUrl}
                    alt={user.name}
                  />
                ))}
              </div>
              <p>{data.likes} fans want to see this host</p>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-shrink-0 gap-1 mx-2 font-medium">
          {data.isLiked ? (
            <HeartIconSolid className="w-auto h-6 text-primary-200" />
          ) : (
            <HeartIcon className="w-auto h-6 text-gray-500 transition hover:text-primary-200" />
          )}
        </div>
      </div>
    </a>
  );
}
