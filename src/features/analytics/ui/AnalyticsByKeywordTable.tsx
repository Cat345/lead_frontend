import { Table } from '@mantine/core';
import { useTable } from '@refinedev/react-table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
} from '@tanstack/react-table';
import { useMemo } from 'react';

type AnalyticsData = {
  name: string;
  good: number;
  neutral: number;
  bad: number;
};

export const AnalyticsByKeywordTable = ({ analyticsData }: { analyticsData: AnalyticsData[] }) => {
  const columns = useMemo<ColumnDef<AnalyticsData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Ключевик',
      },
      {
        accessorKey: 'good',
        header: 'Хороших',
      },
      {
        accessorKey: 'neutral',
        header: 'Нейтральных',
      },
      {
        accessorKey: 'bad',
        header: 'Плохих',
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data: analyticsData,
    enableGlobalFilter: false,
    enableHiding: false,
    enableGrouping: true,
    enableFilters: false,
    enablePinning: false,
    enableExpanding: true,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
      expanded: {},
    },
    paginateExpandedRows: true,
  });

  return (
    <Table highlightOnHover>
      <thead>
        {table.getHeaderGroups()?.map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows?.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
