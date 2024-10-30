"use client";
import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  SortingState, 
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  PaginationState,
  VisibilityState
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import CategoryType from "@/types/category.type";

type Props = {
  categories: CategoryType[];
};

const DataTableListing = ({ categories }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<ColumnDef<(typeof categories)[0]>[]>(() => [
    {
      accessorKey: "category_name",
      header: "Category Name",
      cell: ({ row }) => <div>{row.getValue("category_name")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button asChild size="sm">
            <a href={`listing/edit/${row.original.category_id}`}>Edit</a>
          </Button>
          <Button size="sm" variant="destructive" color="white">
            Delete
          </Button>
        </div>
      ),
    },
  ], []);

  const filteredData = useMemo(() => {
   
    if (!globalFilter) return categories;
    const lowerCaseFilter = globalFilter.toLowerCase();
    return categories.filter((item) =>
      item.category_name?.toLowerCase().includes(lowerCaseFilter)
    );
  }, [globalFilter, categories]);
  

 

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


  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        {/* Entries per page */}
        <div className="flex items-center">
          <label className="mr-2">Entries per page:</label>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination({ ...pagination, pageSize: Number(e.target.value) })
            }
            className="border p-2 rounded"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded"
        />
      </div>

      <div className="rounded-md border">
        <Table className="table-responsive-custom">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center my-4">
        {/* Showing X of Y results */}
        <div>
          Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
          {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)} of{" "}
          {filteredData.length} results
        </div>

        {/* Pagination Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => table.setPageIndex(pagination.pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            onClick={() => table.setPageIndex(pagination.pageIndex + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTableListing;
