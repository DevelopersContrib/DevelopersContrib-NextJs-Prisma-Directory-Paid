"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FaRegFileAlt } from "react-icons/fa";
import {ISettings} from "@/interfaces/domain.interface";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { domainSettingsSchema } from "@/validations/domain.validation";
import { domainSettingsAction } from "@/actions/domain.action";

type Props = {
  settings: ISettings;
};

type Errors = {
  [key: string]: string | undefined;
} | null;

const Main = ({ settings }: Props) => {
  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false); 

  const [data, setData] = useState<ISettings>({
    id: settings?.id,
    title: settings?.title,
    logo: settings?.logo,
    description: settings?.description,
    price:settings?.price
  });

  useEffect(() => {
    setData({
        id: settings?.id || "",
        title: settings?.title || "",
        logo: settings?.logo || "",
        description:  settings.description,
        price:settings?.price || 0,
    });
}, [settings]);

const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const clientAction = async (formData: FormData) => {
    console.log('formData',formData);
    if (isMutation) return; // Prevent multiple submissions
    setIsMutation(true);

    try {
      const fdata = {
        id: settings.id,
        title: formData.get("title") as string,
        logo: formData.get("logo") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price") as string),
      };
      
      const validations = domainSettingsSchema.safeParse(fdata);
      if (!validations.success) {
        const newErrors: Errors = {};
        validations.error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message;
        });

        setErrors(newErrors);
        return;
      }

      setErrors(null); // Clear previous errors if any
      
      const res = await domainSettingsAction(fdata);
      if (res.message === "Domain Settings updated successfully") {
        const userId = res.id?.toString();
        
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
          {`Domain`}
        </h2>
      </div>
      <div>
        {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">
                  Saved Successfully!
              </span>
              </div>
          )}
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
              <Label className="label">Title</Label>
              <Input id="title" name="title"  type="text" value={data.title} onChange={handleChange} className={`input ${errors?.title ? "input-error" : ""}`} />
              {errors?.title && (<p className="text-red-500 font-sans">{errors?.title}</p>)}
            </div>
            <div className="gap-y-2">
              <Label className="label">URL Logo</Label>
              <Input id="logo" name="logo" type="text" value={data.logo} onChange={handleChange} className={`input ${errors?.logo ? "input-error" : ""}`} />
              {errors?.logo && (<p className="text-red-500 font-sans">{errors?.logo}</p>)}
            </div>
            <div className="gap-y-2">
              <Label className="label">Description</Label>
              <textarea id="description" name="description"  value={data.description} onChange={handleChange} className={`input ${errors?.description ? "input-error" : ""}`} />
              {errors?.description && (<p className="text-red-500 font-sans">{errors?.description}</p>)}
            </div>
            <div className="gap-y-2">
              <Label className="label">Price</Label>
              <Input id="price" name="price" type="text" value={data.price} onChange={handleChange} className={`input ${errors?.price ? "input-error" : ""}`} />
              {errors?.price && (<p className="text-red-500 font-sans">{errors?.price}</p>)}
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
