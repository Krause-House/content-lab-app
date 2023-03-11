"use client";

import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import classNames from "~/util/classNames";
import supabase from "~/util/supabase-browser";
import User from "~/types/User";

const signout = async () => {
  await supabase.auth.signOut();
};

export default function UserMenu({ user }: { user: User }) {
  return (
    <Menu as="div" className="relative flex-shrink-0">
      <div>
        <Menu.Button className="flex text-sm text-black rounded-full shadow-none bg-primary-500 focus:outline-none ">
          <span className="sr-only">Open user menu</span>
          <Image
            width={24}
            height={24}
            className="w-8 h-8 rounded-full"
            src={user.user_metadata?.avatar_url ?? "/assets/avatars/empty.webp"}
            alt=""
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right border-2 border-black rounded-lg shadow-lg bg-tan focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={signout}
                className={classNames(
                  active ? "bg-tan-500" : "",
                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
