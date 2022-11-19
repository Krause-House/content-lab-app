"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b-2 border-gray-500 bg-tan">
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

          <div className="flex items-center h-full">
            <span className="sr-only">Gameday</span>
            <Image
              src="/assets/wordmark.png"
              alt="Gameday"
              width={138}
              height={32}
              className="h-auto"
            />
          </div>
          <div className="block">
            <div className="flex items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="relative flex-shrink-0">
                <div>
                  <Menu.Button className="flex text-sm text-white rounded-full shadow-none bg-primary-500 focus:outline-none ">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      width={24}
                      height={24}
                      className="w-8 h-8 rounded-full"
                      src="/assets/avatars/greg.jpeg"
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
                          href="#"
                          className={classNames(
                            active ? "bg-tan-500" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-tan-500" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-tan-500" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
