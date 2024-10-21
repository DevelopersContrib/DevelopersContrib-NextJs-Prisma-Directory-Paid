import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import Search from "./components/Search";
import { LinkType } from "@/types/link.type";




type Props = {
  recents: LinkType[];
  categories: LinkType[];
  featured: LinkType[];
  data: any | null | undefined;
  domain: string | null | undefined;
};
import FeaturedSlider from "./components/FeaturedSlider";
import { capitalizeFirstLetter } from "@/helpers/capitalize-first-letter";

const Homepage = ({ categories, recents, featured, data, domain }: Props) => {
  const currentYear = new Date().getFullYear();
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
        <div className="container text-center py-14">
          <h1 className="text-6xl mb-4 font-bold text-gray-800">
            {domain ? capitalizeFirstLetter(domain) : ""}{" "}
            <span className="capitalize">
              {" "}
              <br /> Your Curated Resource Directory
            </span>
          </h1>
          <p className="text-base text-gray-400 xl:max-w-[50%] xl:mx-auto">
            {data.description}
          </p>
        </div>
        <div className="container mb-14">
          <FeaturedSlider featured={featured} />
        </div>
        {/* End:: Hero Section */}

        {/* Start:: Search Section */}
        <Search categories={categories} defaultrecents={recents} />
        {/* End:: Search Section */}

        <footer className="py-8 w-full border-t border-[#ddd]">
          <div className="container flex justify-between text-sm text-[#777]">
            <div>
              &copy; {currentYear} {domain && capitalizeFirstLetter(domain)}.
              All rights reserved.
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
      </main>
    </>
  );
};

export default Homepage;
