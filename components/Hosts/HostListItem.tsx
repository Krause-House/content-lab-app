import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";

type HostData = {
  id: number;
  name: string;
  avatarUrl: string;
  likes: number;
  isLiked: boolean;
};

export default function HostListItem({ data }: { data: HostData }) {
  return (
    <a href="#" className="block bg-white ">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start flex-1 min-w-0 gap-3">
          <Image
            width={48}
            height={48}
            key={data.id}
            className="inline-block w-10 h-10 rounded-full ring-2 ring-gray-50"
            src={data.avatarUrl}
            alt={data.name}
          />
          <div className="">
            <h4 className="text-base font-medium truncate text-primary-500">
              {data.name}
            </h4>
            <div className="flex items-center gap-2 mt-0 text-sm text-gray-500">
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
