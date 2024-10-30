import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import DataTableListing from "./DataTableListing";
import CategoryType from "@/types/category.type";

type Props = {
  categories: CategoryType[];
};


const Main = ({categories}: Props) => {
  return (
    <div className="p-[50px] flex flex-col gap-y-8 w-full">
      <div>
        <h2 className="font-sans font-semibold text-2xl text-black/60 flex items-center">
          <span className="mr-2">
            <FaRegFileAlt />
          </span>
          {`Manage Category`}
        </h2>
      </div>
      <div>
      <DataTableListing categories={categories}/>
      </div>
    </div>
  );
};

export default Main;
