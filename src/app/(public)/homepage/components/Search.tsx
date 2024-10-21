"use client";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { LinkType } from "@/types/link.type";
import ListCategories from "../components/ListCategories";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  defaultrecents: LinkType[];
  categories: LinkType[];
};

const Search = ({ categories, defaultrecents }: Props) => {
  const [search, setSearch] = useState("");
  const [recents, setRecents] = useState<LinkType[]>(defaultrecents);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number[]>([]);
  
  const [total, setTotal] = useState(defaultrecents.length);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handleClick = (index: number): void => {
    const updatedActiveCategory = activeCategory.includes(index)
      ? activeCategory.filter((button) => button !== index)
      : [...activeCategory, index];

    setActiveCategory(updatedActiveCategory);
    handleSearch(updatedActiveCategory.join(),1);
  };

  const pageClick = (index: number): void => {
    setPage(index);

    handleSearch(activeCategory.join(),index);
  };


  const resetActiveCategory = (): void => {
    setActiveCategory([]);
    handleSearch("",1);
  };

  const handleSearch = async (category: string, p:number) => {
    setLoading(true);
    try {
      console.log('page',p)
      console.log('search',search)
      console.log('category',category)
      const { data } = await axios.post("/api/link/search", {
        page:p,
        search,
        category,
      });
      const items = data.items as LinkType[];
      setRecents(items);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);
  
  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page > 1) setPage(page - 1);
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    handleSearch(activeCategory.join(),page);
  }, [page]);

  return (
    <>
      <div className="container mb-4 flex flex-col">
        <div className="mb-4 flex">
          <div className="flex border rounded-xl border-[#ddd] text-base w-full lg:w-[50%] lg:mx-auto">
            <input
              type="search"
              className="bg-transparent h-[50px] lg:mx-auto w-full px-4 py-1 focus:outline-none focus:ring-0 focus:border-none"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch(activeCategory.join(),1)
              }
            />
            <span
              onClick={() => handleSearch(activeCategory.join(),1)}
              className="flex items-center justify-center px-4 text-[#777]"
            >
              {loading ? (
                <CgSpinner className="animate-spin  w-8 h-8" />
              ) : (
                <FaSearch />
              )}
            </span>
          </div>
        </div>

     

        <ul className="flex w-full flex-wrap mb-4 justify-center">
          <li className="bg-[#e9ecef] text-[#444] rounded-sm text-sm inline-flex flex-col mr-1 mb-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                resetActiveCategory();
              }}
              className="capitalize block font-light px-3 py-2"
            >
              all
            </button>
          </li>
          {categories.map((cat, index) => (
            <li
              key={index}
              className="bg-[#e9ecef] text-[#444] rounded-sm text-sm inline-flex flex-col mr-1 mb-1"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(parseInt(cat.categoryId));
                }}
                className={
                  activeCategory.includes(parseInt(cat.categoryId))
                    ? " capitalize block font-light px-3 py-2 btn-primary rounded"
                    : "capitalize block font-light px-3 py-2"
                }
              >
                {cat.category.category_name}
              </button>
            </li>
          ))}
        </ul>
        {loading ? (
          <div className="flex justify-center items-center">
            <CgSpinner className="animate-spin w-8 h-8" />
          </div>
        ) : (
          <>
          <ListCategories recents={recents} />
          <div className="container mb-14">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} isActive={page === 1} href="#" />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      pageClick(i + 1);
                    }}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={handleNext} isActive={page === totalPages} href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
            </div>
          </>
          
        )}
      </div>
    </>
  );
};

export default Search;
