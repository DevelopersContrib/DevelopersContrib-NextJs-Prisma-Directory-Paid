"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getCategoryName } from "@/actions/link.action";
import { historyAction } from "@/actions/history.action";
import { toast } from "sonner";

type Props = {
  id: string;
};
import { BiDislike, BiLike } from "react-icons/bi";
import { set } from "lodash";

const Category = ({ id }: Props) => {

    const [categoryName, setCategoryName] = useState<string>("");
    
    useEffect(() => {
        const fetchLikes = async () => {
            const res = await getCategoryName({categoryId: id, path:'/'});
            if (res.data !=null ) {
                setCategoryName(res.data);
            }
        };

       
        fetchLikes();
       
    }, []);

    

    

  return (
    <>
      <span className="">{categoryName}</span>
      
    </>
  );
};

export default Category;
