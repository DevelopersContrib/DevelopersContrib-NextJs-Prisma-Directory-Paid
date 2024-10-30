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
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PaymentType } from "@/types/payment.type";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  recents: PaymentType[];
};

const DataTableListing = ({ recents }: Props) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<ColumnDef<(typeof recents)[0]>[]>(() => [
    {
      accessorKey: "payment_type",
      header: "Payment Type",
      cell: ({ row }) => <div>{row.getValue("payment_type")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div>{row.getValue("amount")}</div>,
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
  ], []);

  const filteredData = useMemo(() => {
   
    if (!globalFilter) return recents;
    const lowerCaseFilter = globalFilter.toLowerCase();
    return recents.filter((item) =>
      item.payment_type?.toLowerCase().includes(lowerCaseFilter)
    );
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



  return (
    <div className="w-full">
       {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-48 w-full border mt-8">
            <div className="text-lg text-slate-400 flex items-center">
              <span className="mr-4">
                <FaSearch />
              </span>
              No transaction found.
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <label className="mr-2">Entries per page:</label>
                <select
                  value={pagination.pageSize}
                  onChange={(e) => setPagination({ ...pagination, pageSize: Number(e.target.value) })}
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
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
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
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table?.getRowModel()?.rows?.length ? (
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

            <div className="flex justify-between items-center my-4">
              <div>
                Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)} of{" "}
                {filteredData.length} results
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
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
  );
};

export default DataTableListing;
