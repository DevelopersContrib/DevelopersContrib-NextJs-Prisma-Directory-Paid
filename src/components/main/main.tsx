"use client";

import React from "react";

import { ILinkWithCategory } from "@/interfaces/link.interface";

import { Toaster } from "sonner";
import DisplayPost from "./display-post";
import ChooseFile from "./choose-file";
import RestoreDeleted from "./restore-deleted";
import Subtitle from "../sidebar/subtitle";
import List from "../sidebar/list";
import { FaRegFileAlt, FaRegStar } from "react-icons/fa";
import { CardText } from "react-bootstrap";
import DataTableListing from "@/app/(admin)/dashboard/components/DataTableListing";
import { LinkType } from "@/types/link.type";
import CategoryType from "@/types/category.type";

// type Props = {
//   recents: LinkType[];
// };
type Props = {
  recents: LinkType[];
  categories: CategoryType[];
  userId: string;
};

// const Main = ({ recents }: { recents: LinkType[] }) => {
  const Main = ({recents, categories, userId}: Props) => {
  return (
    <div className="p-[50px] flex flex-col gap-y-8 w-full">
      {/* <div>
        <div className="px-5 mb-3">
          <h4 className="font-sans font-semibold text-sm text-black/60">{`Your Listings`}</h4>
        </div>
        <div className="flex flex-col gap-y-1">
          {recents.length ? (
            recents.map((recent) => (
              <List
                key={recent.id}
                categoryId={recent.categoryId}
                linkId={recent.id}
                title={recent.title}
                icon={<FaRegFileAlt className="w-5 h-5 " />}
                active={false}
                activeColor="bg-[#312EB5]"
              />
            ))
          ) : (
            <h3 className="subheading px-5">There are no recent posts</h3>
          )}
        </div>
      </div> */}
      <div>
        <h2 className="font-sans font-semibold text-2xl text-black/60 flex items-center">
          <span className="mr-2">
            <FaRegFileAlt />
          </span>
          {`Your Listings`}
        </h2>
        <DataTableListing recents={recents} categories={categories} userId={userId} />
      </div>
    </div>
  );
};

export default Main;
