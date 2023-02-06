"use client";
import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Card from "~/components/Card";
import Modal from "~/components/Modal";
import { AppleIdForm } from "~/components/Forms";

export default function ReviewContestCard({
  title,
  description,
  reviewsLink,
  userEmail,
}: {
  title: string;
  description: string;
  reviewsLink?: string;
  userEmail: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="my-4 transition cursor-pointer bg-primary-200 card-shadow-hover">
        <div
          className="flex items-center gap-8 px-4 py-4 sm:px-6"
          onClick={() => setModalOpen(true)}
        >
          <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
            <div>
              <label className="flex text-xs text-gray-300 accent">
                Write a review
              </label>

              <h3 className="text-gray-50">{title}</h3>

              <div className="mt-3 text-sm text-gray-300">{description}</div>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 gap-1 ml-5 font-medium text-gray-50">
            <p className="hidden sm:block">Write your review</p>
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </Card>
      <Modal isOpen={modalOpen} setIsOpen={(isOpen) => setModalOpen(isOpen)}>
        <AppleIdForm
          userEmail={userEmail}
          reviewsLink={reviewsLink}
          onComplete={() => {
            setModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
