import { Badge, Button, Checkbox, Group, HoverCard, Pagination, Table, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useDeleteMany, useTranslate } from '@refinedev/core';
import { CreateButton, DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';
import { mapStatus } from './lib/mapStatus';

export default function GroupList() {
  const translate = useTranslate();
  const { mutate } = useDeleteMany();

  const deleteSelectedItems = (ids: number[]) => {
    mutate(
      {
        resource: 'groups',
        ids,
      },
      {
        onSuccess: () => {
          resetRowSelection();
        },
      }
    );
  };

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        enableSorting: false,
        enableColumnFilter: false,
        header: function render({ table }) {
          return (
            <Group noWrap>
              <Checkbox
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />

              {(table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected()) && (
                <Button
                  id="delete-selected"
                  size="xs"
                  color="red"
                  variant="outline"
                  onClick={() => {
                    const ids = table.getSelectedRowModel().flatRows.map((row) => +row.id);
                    deleteSelectedItems(ids);
                  }}
                >
                  Удалить
                </Button>
              )}
            </Group>
          );
        },
        cell: function render({ row }) {
          return (
            <Group noWrap>
              <Checkbox
                checked={row.getIsSelected()}
                indeterminate={row.getIsSomeSelected()}
                onChange={row.getToggleSelectedHandler()}
              />
            </Group>
          );
        },
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: translate('groups.fields.name'),
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: translate('groups.fields.status'),
        cell: function render({ getValue, row }) {
          const values = row.original;
          return (
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
                <Badge
                  color={
                    getValue() === 'active'
                      ? 'green'
                      : getValue() === 'request_sent'
                      ? 'blue'
                      : 'red'
                  }
                  style={{ cursor: 'default' }}
                >
                  {mapStatus(getValue() as string)}
                </Badge>
              </HoverCard.Target>
              {values.errorReason && (
                <HoverCard.Dropdown>
                  <Text size="sm">{values.errorReason}</Text>
                </HoverCard.Dropdown>
              )}
            </HoverCard>
          );
        },
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: translate('table.actions'),
        cell: function render({ getValue, row }) {
          const { index } = row;
          return (
            <Group spacing="xs" noWrap>
              <EditButton
                id={`button-edit-${index}`}
                hideText
                recordItemId={getValue() as string}
              />
              <DeleteButton
                id={`button-delete-${index}`}
                hideText
                recordItemId={getValue() as string}
              />
            </Group>
          );
        },
      },
    ],
    []
  );

  const isMobile = useMediaQuery('(max-width: 600px)');

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
    resetRowSelection,
  } = useTable({
    getRowId: (originalRow) => originalRow.id.toString(),
    columns,
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  const headerGroups = getHeaderGroups();
  const rowModel = getRowModel();

  return (
    <div style={{ padding: '4px', paddingBottom: '50px' }}>
      <Tour />
      <List
        headerButtons={[
          // <ImportButton
          //   variant="outline"
          //   schema={groupsSchema}
          //   leftIcon={<IconFileImport size="1rem" />}
          // />,
          <CreateButton>Создать</CreateButton>,
        ]}
      >
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
}
