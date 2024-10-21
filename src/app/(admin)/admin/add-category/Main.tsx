import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

const Main = () => {
  return (
    <div className="p-[50px] flex flex-col gap-y-8 w-full">
      <div>
        <h2 className="font-sans font-semibold text-2xl text-black/60 flex items-center">
          <span className="mr-2">
            <FaRegFileAlt />
          </span>
          {`Add New Category`}
        </h2>
      </div>
      <div>
        <div className="w-1/2 flex flex-col gap-y-4">
          <div className="gap-y-2">
            <Label className="label">URL Logo</Label>
            <Input type="text" />
          </div>
          <div className="gap-y-2">
            <Label className="label">Title</Label>
            <Input type="text" />
          </div>
          <div className="gap-y-2">
            <Label className="label">Description</Label>
            <Input type="text" />
          </div>
          <div className="gap-y-2">
            <Label className="label">Price</Label>
            <Input type="text" />
          </div>
          <div className="mt-4">
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
