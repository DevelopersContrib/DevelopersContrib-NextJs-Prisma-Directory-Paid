"use client";
import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  PaginationState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

type ListingType = {
  id: string;
  logo: string;
  title: string;
  description: string;
  price: string;
};

const staticData: ListingType[] = [
  {
    id: "1",
    logo: "https://manage.vnoc.com/uploads/directory/ad295946-b663-4d50-a276-840e1e6c71e2.jpg?w=64&q=75",
    title: "Service A",
    description: "Description for Service A",
    price: "$100",
  },
  {
    id: "2",
    logo: "https://manage.vnoc.com/uploads/directory/ad295946-b663-4d50-a276-840e1e6c71e2.jpg?w=64&q=75",
    title: "Service B",
    description: "Description for Service B",
    price: "$200",
  },
  {
    id: "3",
    logo: "https://manage.vnoc.com/uploads/directory/ad295946-b663-4d50-a276-840e1e6c71e2.jpg?w=64&q=75",
    title: "Service C",
    description: "Description for Service C",
    price: "$300",
  },
];

const DataTableListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Filter data based on the search term
  const filteredData = staticData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = useMemo<ColumnDef<ListingType>[]>(
    () => [
      {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => (
          <Image src={row.getValue("logo")} alt="Logo" width={50} height={50} />
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <div>{row.getValue("price")}</div>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button asChild size="sm">
              <a href={`listing/edit/${row.original.id}`}>Edit</a>
            </Button>
            <Button size="sm" variant="destructive" color="white">
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: false, // Automatically handle pagination
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),
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
