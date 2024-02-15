import { Box, Flex, Group, Pagination, Table } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { CreateButton, DeleteButton } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import React from 'react';

import { ColumnFilter } from './column-filter';
import { ColumnSorter } from './column-sorter';

export const UserTable: React.FC = () => {
  const t = useTranslate();
  const columns = React.useMemo<ColumnDef<IUser>[]>(
    () => [
      // {
      //   id: "id",
      //   header: "ID",
      //   accessorKey: "id",
      //   meta: {
      //     filterOperator: "eq",
      //   },
      // },
      {
        enableResizing: true,
        id: 'status',
        header: 'Статус',
        accessorKey: 'status',
        meta: {
          filterOperator: 'eq',
        },
      },
      {
        id: 'Phone',
        header: 'Телефон',
        accessorKey: 'Phone',
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        enableResizing: true,

        id: 'type',
        header: 'Тип',
        accessorKey: 'type',
        meta: {
          filterOperator: 'eq',
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
      resource: 'Users',
    },
    columns,
  });

  return (
    <div style={{ padding: '4px' }}>
      <Flex justify="space-between" align="center">
        <h2>{t('users.users')}</h2>
        <CreateButton resource="users">Создать</CreateButton>
      </Flex>
      <Table highlightOnHover>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {!header.isPlaceholder && (
                      <Group spacing="xs" noWrap>
                        <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
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
                <td>
                  <DeleteButton resource="users" recordItemId={row.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      <Pagination position="right" total={pageCount} page={current} onChange={setCurrent} />
    </div>
  );
};

interface IUser {
  id: number;
  status: string;
  phone: string;
  type: string;
}
