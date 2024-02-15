import { Box, Group, Pagination, Table } from '@mantine/core';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { DeleteButton, EditButton, EmailField, List, ShowButton } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import React from 'react';

import { ColumnSorter } from '../../refine/table/ColumnSorter';

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: translate('users.fields.id'),
      },
      {
        id: 'email',
        accessorKey: 'email',
        header: translate('users.fields.email'),
        cell: function render({ getValue }) {
          return <EmailField value={getValue<any>()} />;
        },
      },
      {
        id: 'role',
        accessorKey: 'role',
        header: translate('users.fields.role'),
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
      },
    ],
    [translate]
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

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
