"use client";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import Card from "~/components/Card";

export default function ReferralCard({
  title,
  creatorIdToSubscribeTo,
  referredByEmail,
  redirectTo,
  description,
}: {
  title: string;
  description: string;
  creatorIdToSubscribeTo?: string;
  referredByEmail?: string;
  redirectTo?: string;
}) {
  return (
    <Card className="my-4 transition cursor-pointer bg-primary-200 card-shadow-hover">
      <div
        className="flex items-center gap-8 px-4 py-4 sm:px-6"
        onClick={() => {
          navigator.clipboard.writeText(
            window.location.origin +
              `/creator/${creatorIdToSubscribeTo}/signup?referredBy=${
                referredByEmail || ""
              }&redirectTo=${redirectTo || "/"}`
          );
          toast.success("Copied referral link to clipboard", {
            id: "copy",
          });
        }}
      >
        <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
          <div>
            <label className="flex text-xs text-gray-300 accent">
              Refer a friend
            </label>

            <h3 className="text-gray-50">{title}</h3>

            <div className="mt-3 text-sm text-gray-300">{description}</div>
          </div>
        </div>
        <div className="flex items-center flex-shrink-0 gap-1 ml-5 font-medium text-gray-50">
          <ClipboardDocumentIcon className="w-5 h-5" aria-hidden="true" />
          <p className="hidden sm:block">Copy referral link</p>
        </div>
      </div>
    </Card>
  );
}
