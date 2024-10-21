"use client";
import React, { useState, useMemo } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CgSpinner } from "react-icons/cg";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { debounce } from "lodash";
import Image from "next/image";
import axios from "axios";
import { imageLoader } from "@/helpers/image-helpers";
import { LinkType } from "@/types/link.type";
import { FaSearch } from "react-icons/fa";
import { deleteLinkPermanentAction } from "@/actions/link.action";
import { historyAction } from "@/actions/history.action";
import { toast } from "sonner";
import CreateNewListingModal from "@/components/sidebar/create-new-listing-modal";
import BulkUploadModal from "@/components/sidebar/bulk-upload-modal";

import CategoryType from "@/types/category.type";
import { useRouter } from "next/navigation";
type Props = {
  recents: LinkType[];
  categories: CategoryType[];
  userId: string;
};

const DatatableListing = ({ recents, categories, userId }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isMutation, setIsMutation] = useState<boolean>(false);

  const deleteAction = async (id: string) => {
    if (isMutation) return null;
    setIsMutation(true);

    const isConfirmed = confirm(
      "Are you sure you want to delete this listing ?"
    );
    if (isConfirmed) {
      try {
        const res = await deleteLinkPermanentAction({
          linkId: id,
          path: "/dashboard",
        });

        if (res.message == "Post deleted permanently.") {
          toast("Link deleted permanently.");
        }
      } catch (error) {
        console.info("[ERROR_CLIENT_ACTION]", error);

        toast("Something went wrong");
      } finally {
        setIsMutation(false);
      }
    }
  };

  const [linkData, setLinkData] = useState<LinkType>();

  const router = useRouter();
  const handleEdit = (id: string) => {
    const edit = async (id: string) => {
      try {
        const { data } = await axios.post("/api/link", {
          id: id,
        });

        setLinkData(data);

        router.push(`/dashboard?modal=open&link=${id}`);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
      }
    };
    edit(id);
  };

  // Define columns for the table
  const columns = useMemo<ColumnDef<(typeof recents)[0]>[]>(
    () => [
      {
        accessorKey: "screenshot",
        header: "Image",
        cell: ({ row }) => (
          <Image
            loader={imageLoader}
            src={row.getValue("screenshot")}
            alt=""
            width={50}
            height={50}
            className="rounded border shadow w-[50px] h-[50px]"
            priority
          />
        ),
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="hover:bg-slate-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
      },
      {
        accessorFn: (row) => row.category?.category_name,
        id: "categoryName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="hover:bg-slate-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.original.category?.category_name}</div>,
      },
      {
        accessorKey: "countLike",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="hover:bg-slate-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Likes
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.original.countLike}</div>,
      },
      {
        accessorKey: "dislikes",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="hover:bg-slate-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dislikes
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.original.countUnlike}</div>,
      },
      {
        accessorKey: "clicks",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="hover:bg-slate-200"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Clicks
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.original.countClick}</div>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button asChild size="sm">
              <a href={`listing/edit/${row.original.id}`}>Edit</a>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              color="white"
              onClick={() => deleteAction(row.original.id)}
              disabled={isMutation}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Filter the data based only on the displayed columns
  const filteredData = useMemo(() => {
    if (!globalFilter) return recents;
    const lowerCaseFilter = globalFilter.toLowerCase();

    return recents.filter((item) => {
      const matchesString =
        item.title?.toLowerCase().includes(lowerCaseFilter) ||
        item.category?.category_name?.toLowerCase().includes(lowerCaseFilter);

      const matchesNumber =
        item.countLike?.toString().includes(globalFilter) ||
        item.countUnlike?.toString().includes(globalFilter) ||
        item.countClick?.toString().includes(globalFilter);

      return matchesString || matchesNumber;
    });
  }, [globalFilter, recents]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handleFilterChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setGlobalFilter(event.target.value);
    },
    300
  );

  return (
    <>
      <div className="w-full">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-48 w-full border mt-8">
            <div className="text-lg text-slate-400 flex items-center">
              <span className="mr-4">
                <FaSearch />
              </span>
              No listing found.
            </div>
          </div>
        ) : (
          <>
            {/* Entries per page and Search */}
            <div className="flex items-center flex-col lg:flex-row py-4 gap-y-4 lg:gap-0">
              <div className="flex items-center space-x-2">
                <span>Entries per page:</span>
                <select
                  value={pagination.pageSize}
                  onChange={(e) =>
                    setPagination({
                      ...pagination,
                      pageSize: Number(e.target.value),
                    })
                  }
                  className="border rounded px-2 py-1"
                >
                  {[10, 20, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inline-flex space-x-2 lg:ml-auto">
                <Input
                  placeholder="Search..."
                  defaultValue={globalFilter}
                  onChange={handleFilterChange}
                  className="w-full lg:w-[350px]"
                />
              </div>
            </div>

            {/* Table Data */}
            <div className="rounded-md border">
              <div className="table-no-scroller-x">
                <Table className="table-responsive-custom">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination and showing results */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                Showing {table.getRowModel().rows.length} of{" "}
                {table.getCoreRowModel().rows.length} results.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <CreateNewListingModal
        linkData={linkData}
        categories={categories}
        userId={userId}
      />
      <BulkUploadModal
        linkData={linkData}
        categories={categories}
        userId={userId}
      />
    </>
  );
};

export default DatatableListing;
