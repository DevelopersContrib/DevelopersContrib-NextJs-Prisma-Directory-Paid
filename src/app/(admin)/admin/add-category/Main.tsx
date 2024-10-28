"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FaRegFileAlt } from "react-icons/fa";
import CategoryType from '@/types/category.type';
import { toast } from "sonner";
import { categorySchema } from "@/validations/category.validation";
import { categoryAction } from "@/actions/category.action";

type Errors = {
  [key: string]: string | undefined;
} | null;

const Main = () => {
  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false); 

  const clientAction = async (formData: FormData) => {
    
    if (isMutation) return; // Prevent multiple submissions
    setIsMutation(true);

    try {
      const fdata = {
        category_id:'',
        category_name: formData.get("category_name") as string,
      };
    
      const validations = categorySchema.safeParse(fdata);
      if (!validations.success) {
        const newErrors: Errors = {};
        validations.error.issues.forEach((issue: { path: (string | number)[]; message: string | undefined; }) => {
          newErrors[issue.path[0]] = issue.message;
        });
        console.log('newErrors',newErrors)
        setErrors(newErrors);
        return;
      }
      
      setErrors(null); // Clear previous errors if any
      
      const res = await categoryAction(fdata.category_id,fdata.category_name);
      if (res.message === "Category added successfully") {
        const userId = res.category_id?.toString();
        
        setSuccess(true); // Set success state
        // Optionally, you can reset the form here if desired
        // e.g., e.target.reset(); if you pass the event to clientAction
      }
    } catch (error) {
      console.error("[ERROR_CLIENT_ACTION]", error);
      toast("Something went wrong");
    } finally {
      setIsMutation(false); // Reset loading state after completion
    }
  };

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
      {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">
                  Saved Successfully!
              </span>
              </div>
          )}
      <div>
      <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                clientAction(formData);
            }}
            className="flex flex-col gap-y-5"
            >
        <div className="w-1/2 flex flex-col gap-y-4">
          <div className="gap-y-2">
            <Label className="label">Name</Label>
            <Input type="text" name="category_name" id="category_name" className={`input ${errors?.category_name ? "input-error" : ""}`} />
          </div>
          <div className="mt-4">
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Main;
