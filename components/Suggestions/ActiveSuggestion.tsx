import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const suggestion = {
  id: 3,
  title: "Jon does blind commentary",
  watching: 23,
  users: [
    {
      name: "Emily Selman",
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Kristin Watson",
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Emma Dorsey",
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
};

export default function ActiveSuggestion() {
  return (
    <div className="my-8 overflow-hidden rounded-md shadow bg-gradient">
      <a href="#" className="block">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
            <div className="">
              <label className="flex text-xs text-gray-300 sm:text-sm">
                Current Segment
              </label>

              <h3 className="text-base font-medium truncate text-gray-50 sm:text-xl">
                {suggestion.title}
              </h3>

              <div className="flex gap-2 mt-3 text-gray-300">
                <div className="flex -space-x-1">
                  {suggestion.users.map((user) => (
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
                  {suggestion.watching} fans watching
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 gap-1 ml-5 font-medium text-gray-50">
            <p className="hidden sm:block">Watch now</p>
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </a>
    </div>
  );
}
