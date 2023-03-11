import Image from "next/image";
import { MaybeUser } from "~/types/User";

import { SignInButton, SignOutButton } from "~/components/Buttons";

export default function Header({ user }: { user: MaybeUser }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-[#e8c56d]/50 bg-tan">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between h-16">
          <a className="flex items-center h-full" href="/">
            <span className="sr-only">Home</span>
            <Image
              src="/assets/yng_logo.png"
              alt="Gameday"
              width={150}
              height={150}
              priority
              className="block w-auto h-10"
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
