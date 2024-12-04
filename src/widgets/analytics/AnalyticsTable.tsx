import { ActionIcon, Badge, Table } from '@mantine/core';
import { useTable } from '@refinedev/react-table';
import { IconChevronDown, IconChevronRight, IconFold } from '@tabler/icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
} from '@tanstack/react-table';
import { useMemo } from 'react';

type AnalyticsData = {
  groupName: string;
  keywordName: string;
  quality: string;
  leadText: string;
};

export const AnalyticsTable = ({ analyticsData }: { analyticsData: AnalyticsData[] }) => {
  const columns = useMemo<ColumnDef<AnalyticsData>[]>(
    () => [
      {
        accessorKey: 'keywordName',
        header: ({ column }) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Ключевик</span>
          </div>
        ),
        cell: ({ row, getValue }) => {
          return (
            <div
              style={{ paddingLeft: `${row.depth * 2}rem`, display: 'flex', alignItems: 'center' }}
            >
              {row.getCanExpand() && (
                <ActionIcon
                  onClick={row.getToggleExpandedHandler()}
                  variant="subtle"
                  size="sm"
                  style={{ marginRight: '0.5rem' }}
                >
                  {row.getIsExpanded() ? (
                    <IconChevronDown size={16} />
                  ) : (
                    <IconChevronRight size={16} />
                  )}
                </ActionIcon>
              )}
              {getValue() as string}
            </div>
          );
        },
      },
      {
        accessorKey: 'groupName',
        header: 'Группа',
      },
      {
        accessorKey: 'leadText',
        header: 'Лид',
        cell: ({ getValue }) => {
          return <div dangerouslySetInnerHTML={{ __html: getValue()?.toString() || '' }} />;
        },
      },
      {
        accessorKey: 'quality',
        header: 'Качество',
        cell: ({ getValue }) => {
          const value = getValue();
          if (!value) return null;
          const qualityName =
            value === 'good' ? 'Хороший' : value === 'bad' ? 'Плохой' : 'Нейтральный';
          return (
            <Badge color={value === 'good' ? 'green' : value === 'bad' ? 'red' : 'yellow'}>
              {qualityName}
            </Badge>
          );
        },
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
      grouping: ['keywordName'],
      expanded: true,
    },
    paginateExpandedRows: true,
  });

  return (
    <Table striped highlightOnHover>
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
