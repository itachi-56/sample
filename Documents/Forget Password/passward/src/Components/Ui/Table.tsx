'use client';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

interface ReusableTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  tableClassName?: string;
  onRowClick?: (row: T) => void;
}

const Table = <T,>({ data, columns, onRowClick }: ReusableTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className=" h-full">
      <table className="custom-table w-full border-collapse">
        <thead className="block w-full bg-[#F4F5FA]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="table w-full table-fixed">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-start text-xl"
                  style={{ height: '45px' }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="block max-h-[calc(100vh-250px)] overflow-y-auto w-full">
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={`${(row.id, index)}}`}
              onClick={() => onRowClick?.(row.original)}
              className={`${
                onRowClick ? 'cursor-pointer' : 'cursor-default'
              } border-b border-[#eee] table w-full table-fixed`}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td key={index} className="text-lg" style={{ height: '40px' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
