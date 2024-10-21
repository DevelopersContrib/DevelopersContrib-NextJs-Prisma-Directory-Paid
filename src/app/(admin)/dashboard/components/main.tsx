"use client";

import React from "react";

import { FaRegFileAlt, FaRegStar } from "react-icons/fa";
import DataTableListing from "@/app/(admin)/dashboard/components/DataTableListing";
import { LinkType } from "@/types/link.type";
import CategoryType from "@/types/category.type";

type Props = {
  recents: LinkType[];
  categories: CategoryType[];
  userId: string;
};

// const Main = ({ recents }: { recents: LinkType[] }) => {
const Main = ({ recents, categories, userId }: Props) => {
  return (
    <div className="p-[50px] flex flex-col gap-y-8 w-full">
      <div>
        <div className="bg-[#cfe2ff] p-8 border border-[#9ec5fe] text-[#052c65]">
          <h1 className="text-3xl mb-4">
            Welcome to Your Dashboard!.
          </h1>
          <p className="mb-4">
            <strong>Here’s how to get started:</strong>
          </p>
          <ol className="mb-4 ">
            <li className="list-disc list-inside">
              Post Your First Link:
              Share your product or service with our community. It only takes a minute to get listed. Post a Link.
            </li>
            <li className="list-disc list-inside">
              Check Out the Categories:
              Explore listings in your niche. You can upvote/downvote links and discover other businesses in your industry. Browse Categories.
            </li>
            <li className="list-disc list-inside">
              Track Your Listings:
              Once your links are live, visit our simple Analytics Dashboard to view your submission performance.
            </li>
          </ol>
        </div>
      </div>
      <div>
        <h2 className="font-sans font-semibold text-2xl text-black/60 flex items-center">
          <span className="mr-2">
            <FaRegFileAlt />
          </span>
          {`Your Listings`}
        </h2>
        <DataTableListing
          recents={recents}
          categories={categories}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Main;
