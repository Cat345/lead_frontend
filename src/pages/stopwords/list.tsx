import { Button, Checkbox, Group, Pagination, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useDeleteMany, useTranslate } from '@refinedev/core';
import { BooleanField, CreateButton, DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { IconCheck, IconFileImport, IconX } from '@tabler/icons';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { ImportButton } from '../../features/import';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';
import { stopwordsSchema } from './stopwordsSchema';

export default function StopwordList() {
  const translate = useTranslate();
  const { mutate } = useDeleteMany();

  const deleteSelectedItems = (ids: number[]) => {
    mutate(
      {
        resource: 'stopwords',
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
        header: translate('stopwords.fields.name'),
        enableColumnFilter: false,
      },
      {
        id: 'isActive',
        accessorKey: 'isActive',
        header: translate('stopwords.fields.isActive'),
        enableColumnFilter: false,

        cell: ({ getValue, row }: { getValue: any; row: any }) => {
          const { index } = row;
          return (
            <BooleanField
              id={`is-active-${index}`}
              value={getValue() === true}
              trueIcon={<IconCheck />}
              falseIcon={<IconX />}
              valueLabelTrue="Активен"
              valueLabelFalse="Неактивен"
            />
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
          <ImportButton
            variant="outline"
            schema={stopwordsSchema}
            leftIcon={<IconFileImport size="1rem" />}
          />,
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
