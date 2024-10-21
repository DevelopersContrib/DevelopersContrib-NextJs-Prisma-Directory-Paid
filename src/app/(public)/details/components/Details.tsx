"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { capitalizeFirstLetter } from "@/helpers/capitalize-first-letter";
import { BiDislike, BiLike } from "react-icons/bi";
import FeaturedSlider from "./FeaturedSlider";
import { LinkType } from "@/types/link.type";
import { likeAction, countLikesAction } from "@/actions/like.action";
import { unlikeAction, countUnlikesAction } from "@/actions/unlike.action";
import { historyAction } from "@/actions/history.action";
import { toast } from "sonner";


type Props = {
  link: LinkType;
  featured: LinkType[];
  countLikes: any;
  countDislikes: any;
  data: any | null | undefined;
  domain: string | null | undefined;
};

const Details = ({
  link,
  featured,
  countLikes,
  countDislikes,
  data,
  domain,
}: Props) => {

  const [likes, setLikes] = useState<number>(0);
    const [unlikes, setUnlikes] = useState<number>(0);
    const [isMutation, setIsMutation] = useState<boolean>(false);
    const [isUnlikeMutation, setUnlikeMutation] = useState<boolean>(false);

    useEffect(() => {
        const fetchLikes = async () => {
            const res = await countLikesAction(link.id,'/');
            if (res.data !=null) {
                setLikes(res.data);
            }
        };

        const fetchUnlikes = async () => {
            const res = await countUnlikesAction(link.id,'/');
            if (res.data !=null) {
                setUnlikes(res.data);
            }
        };

        fetchLikes();
        fetchUnlikes();
    }, []);

    const clientAction = async () => {
        if (isMutation) return null;
        setIsMutation(true);

        try {
            const res = await likeAction({
                LinkId: link.id,
                userId: '8c903015-2300-4dad-b4bd-db1ed4b43508',
                path: '/',
            });
            if (res.message === "Like created successfully") {
                setLikes(likes + 1);
            }
        } catch (error) {
            console.info("[ERROR_CLIENT_ACTION]", error);

            toast("Something went wrong");
        } finally {
            setIsMutation(false);
        }
    };

    const clientUnlikeAction = async () => {
        if (isUnlikeMutation) return null;
        setUnlikeMutation(true);

        try {
            const res = await unlikeAction({
                LinkId: link.id,
                userId: '8c903015-2300-4dad-b4bd-db1ed4b43508',
                path: '/',
            });
            if (res.message === "Unlike created successfully") {
                setUnlikes(unlikes + 1);
            }
        } catch (error) {
            console.info("[ERROR_CLIENT_ACTION]", error);

            toast("Something went wrong");
        } finally {
            setUnlikeMutation(false);
        }
    };


  return (
    <>
      <header className="flex w-full ">
        <div className="container items-center justify-between flex py-4">
          <div>
            <Link href="/">
              {data.logo && domain ? (
                <Image
                  src={data.logo}
                  width={0}
                  height={0}
                  alt={domain}
                  className="w-[200px] h-[34px] object-contain"
                  sizes="100vw"
                />
              ) : (
                <h3 className="font-bold text-xl">
                  {domain && capitalizeFirstLetter(domain)}
                </h3>
              )}
            </Link>
          </div>
          <div className="flex space-x-4">
            <Button asChild variant={"link"}>
              <Link href="#">
                <FaSearch className="text-xl" />
              </Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex w-full flex-wrap">
        {/* Start:: Hero Section */}
        <div className="container text-center pt-14 pb-8">
          {link.company_logo ? (
          <div className="inline-flex mx-auto">
            <a href="#" className="inline-flex">
              <Image
                src={link.company_logo ?? ""}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto max-h-[110px] object-contain inline-block mx-auto"
              />
            </a>
          </div>
           ) : (
          <h1 className="text-3xl mb-4 font-bold text-gray-800">
            <a href="#" target="_blank" className="text-black">
              {capitalizeFirstLetter(`${link.title}`)}
            </a>
          </h1>
           )}
          <p className="text-base font-normal text-black/70 xl:max-w-[50%] xl:mx-auto mb-4">
            {link.description}
          </p>
          <div className="mb-4 w-full">
            <ul className="inline-flex space-x-2">
              <li className="inline-flex">
                <Link
                  href={link.url}
                  target="_blank"
                  className="inline-flex py-2 px-3 rounded bg-blue-500 text-white text-sm"
                >
                  Visit Site
                </Link>
              </li>
              <li className="inline-flex">
                <div className="inline-flex py-2 px-3 rounded bg-[#50e66754] text-black text-sm">
                  {link.category.category_name}
                </div>
              </li>
              <li className="inline-flex">
                <Button variant={"secondary"} className="flex" onClick={clientAction} disabled={isMutation}>
                  <span className="mr-1">
                    <BiLike />
                  </span>
                  <span className="">{countLikes}</span>
                </Button>
              </li>
              <li className="inline-flex">
                <Button variant={"secondary"} className="flex">
                  <span className="mr-1">
                    <BiDislike />
                  </span>
                  <span className="">{countDislikes}</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mb-8 text-center">
          <a href="#" target="_blank" className="inline-block w-full">
            <img
              src={link.screenshot ?? ""}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-contain inline-block mx-auto"
            />
          </a>
        </div>
        {/* End:: Hero Section */}

        <div className="container py-14">
          <FeaturedSlider featured={featured} />
        </div>
      </main>
      <footer className="py-8 w-full border-t border-[#ddd]">
        <div className="container flex justify-between text-sm text-[#777]">
          <div>
            &copy; 2024 {capitalizeFirstLetter("generalpoll.com")}. All rights
            reserved.
          </div>
          <div className="flex lg:justify-end">
            <ul className="flex space-x-2">
              <li>
                <a href="/about" className="inline-flex">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="inline-flex">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="inline-flex">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy" className="inline-flex">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Details;
