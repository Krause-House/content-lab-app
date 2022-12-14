import { Transition } from "@headlessui/react";
import React, { useState } from "react";
import Card from "~/components/Card";

export default function Tooltip({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div
      className="relative z-10 hover:cursor-pointer"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {children}
      <Transition
        show={isShown}
        enter="transition-all duration-300"
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 -translate-y-10"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 -translate-y-10"
        leaveTo="opacity-0 translate-y-0"
      >
        <Card className="absolute flex w-48 px-2 py-1 text-sm text-center -translate-x-full rounded-lg md:w-64 bg-tan -left-3 ">
          {text}
        </Card>
      </Transition>
    </div>
  );
}
