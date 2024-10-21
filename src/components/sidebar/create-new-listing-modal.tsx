"use client";

import { createLinkAction,updateLinkBodyAction } from "@/actions/link.action";
import FolderType from "@/types/folder.type";
import CategoryType from "@/types/category.type";
import { createLinkSchema } from "@/validations/link.validation";
import { useSearchParams, useRouter } from "next/navigation";
//import React, { useState } from "react";
import axios from 'axios';
import {LinkType} from "@/types/link.type";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
/*
type Errors = {
    title: string | null | undefined;
	description: string | null | undefined;
	userId: string | null | undefined;
	categoryId: string | null | undefined;
	company_name: string | null | undefined;
	company_logo: string | null | undefined;
	screenshot: string | null | undefined;
	url: string | null | undefined;
} | null*/

type Errors = {
  title?: string;
  categoryId?: string;
  description?: string;
  url?: string;
  company_name?: string;
  company_logo?: string;
  screenshot?: string;
} | null;

type Props = {
  categories: CategoryType[];
  userId: string;
  linkData : LinkType | undefined;
};

interface iFData {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  url: string;
  company_name: string;
  company_logo: string;
  screenshot: string;
}

const CreateNewListingModal = ({ linkData, categories, userId }: Props) => {
 
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const link = searchParams.get("link");
  
  const folderId = searchParams.get("folderId");
  const postId = searchParams.get("postId");

  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const [fData, setFData] = useState<iFData>({
    id: "",
    categoryId: '',
    title: '',
    description: '',
    url: '',
    company_name: '',
    company_logo: '',
    screenshot: '',
  });

  useEffect(() => {
    setFData({
      id: linkData?.id || "",
      categoryId: linkData?.categoryId || '',
      title: linkData?.title || '',
      description: linkData?.description || '',
      url: linkData?.url || '',
      company_name: linkData?.company_name || '',
      company_logo: linkData?.company_logo || '',
      screenshot: linkData?.screenshot || '',
    });

  }, [linkData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) => {
    const { name, value } = e.target;
    setFData({
      ...fData,
      [name]: value,
    });
  };

  const clientAction = async (formData: FormData) => {
    if (isMutation) return null;
    setIsMutation(true);

    try {

      const data = {
        id:fData?.id || "",
        userId,
        categoryId: (fData.categoryId) || "",
        title: (fData.title) || "",
        description: (fData.description) || "",
        url: (fData.url) || "",
        company_name: (fData.company_name) || "",
        company_logo: (fData.company_logo) || "",
        screenshot: (fData.screenshot) || "",
        path: window.location.pathname,
      };
      
      const validations = createLinkSchema.safeParse(data);
      if (!validations.success) {
        let newErrors: Errors = {};

        validations.error.issues.forEach((issue) => {
          newErrors = { [issue.path[0]]: issue.message };
        });

        setErrors(newErrors);
        return null;
      } else {
        setErrors(null);
      }

      if(data.id){
        const res = await updateLinkBodyAction(data);
        
        if (res.message === "Link updated successfully.") {
          router.push(
            `/dashboard?categoryId=${res?.data?.categoryId}&linkId=${res?.data?.id}`
          );
          setFData({
            id: "",
            categoryId: '',
            title: '',
            description: '',
            url: '',
            company_name: '',
            company_logo: '',
            screenshot: '',
          });
        }
      }else{
        const res = await createLinkAction(data);
        if (res.message === "Link created successfully.") {
          router.push(
            `/dashboard?categoryId=${res?.data?.categoryId}&linkId=${res?.data?.id}`
          );
        }
      }

      
    } catch (error) {
      console.info(["[ERROR_CLIENT_ACTION]"], error);
    } finally {
      setIsMutation(false);
    }
  };

  const cancel = () => {
    if (folderId && postId) {
      router.push(`/dashboard?folderId=${folderId}&postId=${postId}`);
    } else if (folderId) {
      router.push(`/dashboard?folderId=${folderId}`);
    } else {
      router.push("/dashboard");
    }
  };

  return modal === "open" ? (
    <div className="z-[50] absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary/15">
      <div className="p-8 rounded-1 bg-white shadow flex flex-col space-y-4 w-[400px]">
        {/* Title */}
        <h1 className="font-sans text-4xl font-semibold text-center text-primary">
          New Listing
        </h1>

        {/* Title & Folder */}
        <form action={clientAction} className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              onChange={handleChange}
              value={fData.title}
              className={`input ${errors?.title ? "input-error" : null}`}
            />

            {errors?.title && (
              <p className="text-red-500 font-sans">{errors?.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="folderId" className="label">
              Select Category
            </label>
            <select
              className={`input ${errors?.categoryId ? "input-error" : null}`}
              name="categoryId"
              id="categoryId"
              onChange={handleChange}
              value={fData.categoryId}
            >
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>

            {errors?.categoryId && (
              <p className="text-red-500 font-sans">{errors?.categoryId}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="title" className="label">
              Description
            </label>
            <textarea
              placeholder="Description"
              id="description"
              name="description"
              onChange={handleChange}
              value={fData.description}
              className={`input ${errors?.description ? "input-error" : null}`}
            />

            {errors?.description && (
              <p className="text-red-500 font-sans">{errors?.description}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="title" className="label">
              URL
            </label>
            <input
              type="text"
              placeholder="URL"
              id="url"
              name="url"
              onChange={handleChange}
              value={fData.url}
              className={`input ${errors?.url ? "input-error" : null}`}
            />

            {errors?.url && (
              <p className="text-red-500 font-sans">{errors?.url}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="title" className="label">
              Screenshot URL
            </label>
            <input
              type="text"
              placeholder="Screenshot"
              id="screenshot"
              name="screenshot"
              onChange={handleChange}
              value={fData.screenshot}
              className={`input ${errors?.screenshot ? "input-error" : null}`}
            />

            {errors?.screenshot && (
              <p className="text-red-500 font-sans">{errors?.screenshot}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="title" className="label">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Company Name"
              id="company_name"
              name="company_name"
              onChange={handleChange}
              value={fData.company_name}
              className={`input ${errors?.company_name ? "input-error" : null}`}
            />

            {errors?.company_name && (
              <p className="text-red-500 font-sans">{errors?.company_name}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="title" className="label">
              Company Logo URL
            </label>
            <input
              type="text"
              placeholder="Company Logo"
              id="company_logo"
              name="company_logo"
              onChange={handleChange}
              value={fData.company_logo}
              className={`input ${errors?.company_logo ? "input-error" : null}`}
            />

            {errors?.company_logo && (
              <p className="text-red-500 font-sans">{errors?.company_logo}</p>
            )}
          </div>

          {/* Button Submit & Cancel */}
          <div className="flex flex-items-center gap-x-3">
            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isMutation}
            >
              Save
            </button>
            {/* Cancel */}
            <button
              type="button"
              className="w-fit flex-1 btn btn-danger"
              onClick={cancel}
              disabled={isMutation}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default CreateNewListingModal;
