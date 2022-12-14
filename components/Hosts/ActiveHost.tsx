import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Card from "~/components/Card";

const watching = {
  id: 3,
  title: "Boosh",
  watching: 23,
  users: [
    {
      name: "Emily Selman",
      id: 1,
      imageUrl: "/assets/avatars/commodore.jpeg",
    },
    {
      name: "Kristin Watson",
      id: 2,
      imageUrl: "/assets/avatars/flex.jpeg",
    },
    {
      name: "Emma Dorsey",
      id: 3,
      imageUrl: "/assets/avatars/mario.jpeg",
    },
  ],
};

export default function ActiveHost({
  hostsName,
  isLive = false,
}: {
  hostsName: string;
  isLive?: boolean;
}) {
  return (
    <Card className="my-8 bg-primary-200 card-shadow">
      <a
        href="https://playback.tv/krausehouse"
        target="_blank"
        rel="noreferrer noopener"
        className="block"
      >
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
            <div className="">
              <label className="flex text-xs text-gray-300 sm:text-sm">
                {isLive ? "Currently Hosting" : "Opening Hosts"}
              </label>

              <h3 className="truncate text-gray-50">{hostsName}</h3>

              {isLive && (
                <div className="flex gap-2 mt-3 text-gray-300">
                  <div className="flex -space-x-1">
                    {watching.users.map((user) => (
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
                  <p className="hidden sm:block">
                    {watching.watching} fans watching
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 gap-1 ml-5 font-medium text-gray-50">
            <p className="hidden sm:block">
              {isLive ? "Watch now" : "7 PM EST"}
            </p>
            {isLive && (
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
        </div>
      </a>
    </Card>
  );
}
