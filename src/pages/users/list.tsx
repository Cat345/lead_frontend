import { Group, Pagination, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { DeleteButton, EditButton, EmailField, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const isMobile = useMediaQuery('(max-width: 600px)');

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

  const headerGroups = getHeaderGroups();
  const rowModel = getRowModel();

  return (
    <div style={{ padding: '4px', paddingBottom: '50px' }}>
      <List>
        {isMobile ? (
          <Table highlightOnHover>
            <TableBodyMobile rowModel={rowModel} />
          </Table>
        ) : (
          <Table>
            <TableHeader headerGroups={headerGroups} />
            <TableBody rowModel={rowModel} />
          </Table>
        )}
        <br />
        <Pagination
          id="pagination"
          position="right"
          total={pageCount}
          page={current}
          onChange={setCurrent}
        />
      </List>
    </div>
  );
};
