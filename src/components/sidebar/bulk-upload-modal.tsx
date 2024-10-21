"use client";

import { createLinkAction,updateLinkBodyAction,getIdByTitle,getCategoryIdByName } from "@/actions/link.action";
import FolderType from "@/types/folder.type";
import CategoryType from "@/types/category.type";
import { createLinkSchema } from "@/validations/link.validation";
import { useSearchParams, useRouter } from "next/navigation";
//import React, { useState } from "react";
import axios from 'axios';
import {LinkType} from "@/types/link.type";
import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import Papa from 'papaparse';
import Swal from "sweetalert2";
import ErrorBlock from './error-block';
import Link from "next/link";
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


interface DataItem {
    domain: string;
    category: string;
    title: string;
    description: string;
    company_name: string;
    company_logo: string;
    url: string;

  }

const BulkUploadModal = ({ linkData, categories, userId }: Props) => {
 
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const link = searchParams.get("link");
  console.log(modal)
  
  const folderId = searchParams.get("folderId");
  const postId = searchParams.get("postId");

  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [providers, setProviders] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [values, setValues] = useState<any>(null);
  
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

  const handleUploadCSV = () => {
    setUploading(true);

    const reader = new FileReader();

    const fileInput = inputRef.current;
    if (fileInput && fileInput.files) {
      const filesArray = Array.from(fileInput.files);
      const [file] = filesArray;

      reader.onloadend = async ({target}) => {
        if (target) {
          const csv = Papa.parse(target.result as string, { header: true });
     
          const csvData: any = csv.data;
          const newCSVData = csvData as DataItem[];
          const errorArray: string[] = [];
          let successArray: number = 0;

          
          for(var x=0;x<newCSVData.length;x++){

            if(newCSVData[x].title!=="" && newCSVData[x].category!=="" && newCSVData[x].url!=="") {
                let res = await getIdByTitle({name:newCSVData[x].title});
                let LinkId = null;
                let categoryId = null;
                let url = newCSVData[x].url.includes("https://") ? newCSVData[x].url : "https://"+newCSVData[x].url;
                if (res.data !== null) LinkId = res.data;
                
                if(LinkId){
                    const res2 = await getCategoryIdByName({name:newCSVData[x].category});
                    if(res2.data !== null){
                        categoryId = res2.data;
                        let data = {
                            id:LinkId,
                            categoryId,
                            userId,
                            title: newCSVData[x].title,
                            description: newCSVData[x].description,
                            url: url,
                            company_name: newCSVData[x].company_name,
                            company_logo: newCSVData[x].company_logo,
                            screenshot: "",
                            path: window.location.pathname,
                          };
                           
                          const res = await updateLinkBodyAction(data);
                          if (res.message === "Link updated successfully.") {
                            successArray++;
                          } else {  
                              errorArray.push('Error in updating '+newCSVData[x].title);

                          };
                    }
                        
                          
                    }else {

                        const res2 = await getCategoryIdByName({name:newCSVData[x].category});
                        if(res2.data !== null){
                            categoryId = res2.data;
                            let data = {
                                id:"",
                                categoryId,
                                userId,
                                title: newCSVData[x].title,
                                description: newCSVData[x].description,
                                url: url,
                                company_name: newCSVData[x].company_name,
                                company_logo: newCSVData[x].company_logo,
                                screenshot: "",
                                path: window.location.pathname,
                              };

                              const res = await createLinkAction(data);
                              if (res.message === "Link created successfully.") {
                                successArray++;
                              } else {  
                                errorArray.push('Error in adding '+newCSVData[x].title);
                              };

                        }
                    }
                }

               
            }
                const finalErrors = errorArray.join("\n");
            
                
                if (errorArray.length > 0) {
                    setError(finalErrors);
                    
                    setUploading(false);

                } else {
                    setSuccess('You successfully added '+successArray+' listings.');
                    setUploading(false);
                    
                }
        
          }
          
          
      };
  
      reader.readAsText(file);
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

  return modal === "bulk-upload" ? (
    <div className="z-[50] absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary/15">
    <div className="p-8 rounded-1 bg-white shadow flex flex-col space-y-4 w-[400px]">
      {/* Title */}
      <h1 className="font-sans text-4xl font-semibold text-center text-primary">
       BULK UPLOAD
      </h1>

        { success != "" ?
        <div className="mb-4">
        <div
          className="flex w-full rounded-lg border-l-[6px] border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md md:p-9"
        >
          <div
            className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]"
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                fill="white"
                stroke="white"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-3 text-lg font-semibold text-dark">
              {success}
            </h5>
            
          </div>
        </div>
</div>:null}
{error? (<ErrorBlock msg={error} />): null}
        <div className="font-medium leading-relaxed">
         </div>
      <h4 className="page-header mb-4">Upload a CSV</h4>
      <div className="mb-4">
      <input ref={inputRef} disabled={uploading} type="file" name="file-input" className="form-control" />
      <Link href="https://cdn.vnoc.com/directory/sample.csv">[Download Sample CSV Here]</Link>
      </div>
      {/* Button Submit & Cancel */}
      <div className="flex flex-items-center gap-x-3">
            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleUploadCSV}
               disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            {/* Cancel */}
            <button
              type="button"
              className="w-fit flex-1 btn btn-danger"
              onClick={cancel}
              disabled={uploading}
            >
              Cancel
            </button>
          </div>
      
      
      
    </div>
    </div>
    
  ) : null;
};

export default BulkUploadModal;
