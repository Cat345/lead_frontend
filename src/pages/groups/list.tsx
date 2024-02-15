import { Box, Group, Pagination, Table } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { DeleteButton, EditButton, List, ShowButton } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import React from 'react';

import { statusesRowVariants } from '../../constants/statuses';
import { ColumnFilter } from '../../refine/table/ColumnFilter';
import { ColumnSorter } from '../../refine/table/ColumnSorter';

export const GroupList: React.FC = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'name',
        header: translate('groups.fields.name'),
        accessorKey: 'name',
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'username',
        header: translate('groups.fields.username'),
        accessorKey: 'username',
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'status',
        header: translate('groups.fields.status'),
        accessorKey: 'status',
        cell: function render({ getValue }) {
          const value = getValue();
          const translatedValue = statusesRowVariants.find((status) => status.value === value);
          return translatedValue?.label || 'Статус не найден';
        },
        meta: {
          filterOperator: 'eq',
        },
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: translate('table.actions'),
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              {/* <ShowButton hideText recordItemId={getValue() as string} /> */}
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          );
        },
        meta: {
          filterOperator: false,
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    refineCoreProps: {
      resource: 'groups',
    },
    columns,
  });

  return (
    <div style={{ padding: '4px' }}>
      <List>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <Group spacing="xs" noWrap>
                          <Box>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </Box>
                          <Group spacing="xs" noWrap>
                            <ColumnSorter column={header.column} />

                            {/* <ColumnFilter column={header.column} /> */}
                          </Group>
                        </Group>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <Pagination position="right" total={pageCount} page={current} onChange={setCurrent} />
      </List>
    </div>
  );
};
