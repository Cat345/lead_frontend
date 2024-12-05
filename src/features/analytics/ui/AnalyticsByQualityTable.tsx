import { ActionIcon, Badge, Table } from '@mantine/core';
import { useTable } from '@refinedev/react-table';
import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { mapQualityName } from '../../../utils/mapQualityName';

type AnalyticsData = {
  quality: string;
  text: string;
  date: string;
};

export const AnalyticsByQualityTable = ({ analyticsData }: { analyticsData: AnalyticsData[] }) => {
  const columns = useMemo<ColumnDef<AnalyticsData>[]>(
    () => [
      {
        accessorKey: 'quality',
        header: 'Качество',
        cell: ({ row, getValue }) => {
          const value = getValue() as string;
          const valueText = mapQualityName(value);
          const badgeColor = value === 'good' ? 'green' : value === 'bad' ? 'red' : 'yellow';
          const element = <Badge color={badgeColor}>{valueText}</Badge>;
          if (row.getIsGrouped()) {
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ActionIcon size="sm" variant="subtle" onClick={row.getToggleExpandedHandler()}>
                  {row.getIsExpanded() ? (
                    <IconChevronDown size={18} />
                  ) : (
                    <IconChevronRight size={18} />
                  )}
                </ActionIcon>
                {element}
                <span>({row.subRows.length})</span>
              </div>
            );
          }
          return element;
        },
      },
      {
        accessorKey: 'date',
        header: 'Дата',
        cell: ({ row }) => {
          if (!row.getIsGrouped()) {
            return <div>{new Date(row.original.date).toLocaleDateString('ru-RU')}</div>;
          }
        },
      },
      {
        accessorKey: 'text',
        header: 'Текст',
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
      grouping: ['quality'],
      expanded: {},
    },
    paginateExpandedRows: true,
  });

  return (
    <Table highlightOnHover bg="white">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
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
        {table.getRowModel().rows.map((row) => (
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
