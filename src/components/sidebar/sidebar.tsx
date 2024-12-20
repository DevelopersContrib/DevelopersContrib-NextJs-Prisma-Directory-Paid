"use client";

import Image from "next/image";
import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";
import { FaPlus, FaUpload } from "react-icons/fa6";
import { GiSettingsKnobs } from "react-icons/gi";
import { GrCreditCard } from "react-icons/gr";
import { FaHome, FaRegFileAlt, FaRegStar } from "react-icons/fa";
import { FiTrash, FiArchive } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import Subtitle from "../sidebar/subtitle";

import List from "./list";
import { signOut } from "next-auth/react";
import FolderType from "@/types/folder.type";
import CategoryType from "@/types/category.type";
import { LinkType } from "@/types/link.type";
import Folders from "./folders";
import PostType from "@/types/post.type";
import { useSearchParams, useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/helpers/capitalize-first-letter";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type Props = {
  userId: string;
  categories: CategoryType[];
  recents: LinkType[];
  domain?: string;
  logo: string;
  isAdmin: boolean;
};

const Sidebar = ({ categories, recents, userId, domain, logo, isAdmin }: Props) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const linkId = searchParams.get("linkId");
  const category = searchParams.get("category");

  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const logoutHandler = () => {
    signOut();
  };

  const createNewListing = () => {
    router.push(`/dashboard?modal=open`);
  };

  const bulkImport = () => {
    router.push(`/dashboard?modal=bulk-upload`);
  };

  const toggleAdminDropdown = () => {
    setShowAdminDropdown(!showAdminDropdown);
  };

  return (
    <nav className="min-w-[300px] max-w-[300px] bg-[#1b1b1b] min-h-screen py-8 flex flex-col gap-y-8 overflow-y-auto">
      {/* Logo & Search Buttonn */}
      <div className="px-5 flex flex-col">
        {logo ? (
          <a href="/dashboard" className="text-white">
            <Image
              src={logo}
              alt={domain ?? ""}
              width={101}
              height={38}
              className="w-[101px] h-[38px] object-contain"
            />
          </a>
        ) : (
          <h3 className="font-bold text-xl text-white">
            {domain && capitalizeFirstLetter(domain)}
          </h3>
        )}
        {/* <FiSearch className="w-5 h-5 text-white opacity-40 cursor-pointer" /> */}
      </div>
      {/* New Note Button */}
      <div className="gap-y-2 flex w-full flex-col">
        <a
          href="/dashboard"
          className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white"
        >
          <FaHome className="w-5 h-5" />
          Dashboard
        </a>
        {/* Admin with Dropdown */}
        {
        isAdmin?(
          <div className="relative">
          <button
            onClick={toggleAdminDropdown}
            className={`py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white justify-between ${
              showAdminDropdown ? " bg-[#2c2c2c] " : ""
            }`}
          >
            <div className="w-full flex gap-x-4">
              <MdAdminPanelSettings className="w-5 h-5" />
              Admin
            </div>
            <div className="">
              <IoChevronDown
                className={`w-4 h-4 ${showAdminDropdown ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`w-full bg-[#2c2c2c] flex-col transition duration-300 ease-in-out ${
              showAdminDropdown ? "flex" : "hidden"
            }`}
          >
            <a
              href="/admin/domain"
              className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white text-sm"
            >
              <span className="block pl-9">Domain Settings</span>
            </a>
            <a
              href="/admin/add-category"
              className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white text-sm"
            >
              <span className="block pl-9">Add New Category</span>
            </a>
            <a
              href="/admin/manage-category"
              className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white text-sm"
            >
              <span className="block pl-9">Manage Category</span>
            </a>
            <a
              href="/admin/payments"
              className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white text-sm"
            >
              <span className="block pl-9">Payment Transaction</span>
            </a>
          </div>
        </div>
        ):null}
        <a
          href="/listing/create"
          className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white"
        >
          <FaPlus className="w-5 h-5" />
          New Listing
        </a>
        {/* <button
          className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white"
          onClick={createNewListing}
        >
          <FaPlus className="w-5 h-5" />
          New Listing
        </button> */}

        <button
          className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white"
          onClick={bulkImport}
        >
          <FaUpload className="w-5 h-5" />
          Bulk Import
        </button>
      </div>
      {/* Recents */}

      {/* Settings */}
      <div>
        <div className="px-5 mb-2">
          <Subtitle title="Settings" />
        </div>
        <div className="flex flex-col gap-y-2">
          <a
            href="/account-settings"
            className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white"
          >
            <GiSettingsKnobs className="w-5 h-5" />
            Account Settings
          </a>
          <a
            href="/checkout"
            className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition text-white"
          >
            <GrCreditCard className="w-5 h-5" />
            Subscription Plan
          </a>
          <div
            onClick={logoutHandler}
            className="py-3 px-5 h-[40px] w-full flex items-center gap-x-4 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition"
          >
            <IoIosLogOut className="w-5 h-5 text-white" />
            <h3 className="font-sans text-base font-semibold text-white">
              Logout
            </h3>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
