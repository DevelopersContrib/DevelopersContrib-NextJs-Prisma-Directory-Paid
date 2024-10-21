"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LinkType } from "@/types/link.type";
import Likes from "./Likes";
import Link from "next/link";


type Props = {
  recents: LinkType[];
};
import { BiDislike, BiLike } from "react-icons/bi";

const ListCategories = ({ recents }: Props) => {
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 mb-14">
        {recents.length ? (
          recents.map((recent, index) => (
            <div key={index} className="flex flex-col w-full">
              <a
                href={`/details/${recent.id}/${recent.title}`}
                className="mb-8"
              >
                <Image
                  src={recent.screenshot ?? ""}
                  width={0}
                  height={0}
                  alt={recent.title}
                  className="w-full h-[200px] object-cover object-top shadow-[rgb(23_43_99/24%)_0_3px_8px]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </a>
              <div>
                <h3 className="font-bold text-[#333] text-xl mb-0">
                  <a href="#" className="inline-flex">
                    {recent.title}
                  </a>
                </h3>
              </div>
              <div>
                <hr className="border-gray-200/95 mt-4 mb-6" />
              </div>
              <div className="mb-4">
                <div className="inline-flex py-2 px-3 rounded bg-[#50e66754] text-black text-sm">
                  {recent.category.category_name}
                </div>
              </div>
              <div className="mb-4 font-light text-gray-600/80 text-[14px]">
                {recent.description}
              </div>
              <Likes id={recent.id} />
              <div>
                <Button size={"lg"} className="w-full">
                  <Link href={`/details/${recent.id}/${recent.title}`}>
                    Details
                  </Link>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-3 lg:col-span-4">
            <h3 className="text-xl px-5 text-slate-500 text-center w-full">
              There are no recent posts
            </h3>
          </div>
        )}
      </div>

      
    </>
  );
};

export default ListCategories;
