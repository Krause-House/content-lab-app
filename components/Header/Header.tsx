import Image from "next/image";
import { MaybeUser } from "~/types/User";

import { SignInButton, SignOutButton } from "~/components/Buttons";
import UserMenu from "./UserMenu";

export default function Header({ user }: { user: MaybeUser }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-gray-500 bg-tan">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">
              <img
                className="block w-auto h-8"
                src="/icon.png"
                alt="Krause House"
              />
            </div>
          </div>

          <a className="flex items-center h-full" href="/">
            <span className="sr-only">Home</span>
            <Image
              src="/assets/wordmark.png"
              alt="Gameday"
              width={138}
              height={32}
              priority
              className="hidden w-auto h-5 md:block"
            />
          </a>

          <div className="block">
            <div className="flex items-center">
              {!!user ? <SignOutButton /> : <SignInButton />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
