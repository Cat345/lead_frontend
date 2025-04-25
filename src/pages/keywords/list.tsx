import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Pagination,
  RingProgress,
  Table,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IResourceComponentsProps, useDeleteMany, useTranslate } from '@refinedev/core';
import { BooleanField, CreateButton, DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { IconCheck, IconFileImport, IconX } from '@tabler/icons';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { ImportButton } from '../../features/import';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';
import { keywordsSchema } from './keywordsSchema';

export default function KeywordList() {
  const translate = useTranslate();
  const { mutate } = useDeleteMany();

  const deleteSelectedItems = (ids: number[]) => {
    mutate(
      {
        resource: 'keywords',
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
                    console.log(table.getSelectedRowModel().flatRows);
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
        header: translate('keywords.fields.name'),
        meta: {
          filterOperator: 'contains',
        },
        cell({ getValue }) {
          const value = getValue<string>();
          return (
            <Anchor
              sx={{ color: 'inherit' }}
              target="_blank"
              href={`/leads?pageSize=100&current=1&filters[0][field]=text&filters[0][operator]=contains&filters[0][value]=${value}`}
            >
              {value}
            </Anchor>
          );
        },
      },
      {
        id: 'conversionRate',
        header: translate('keywords.fields.conversionRate'),
        accessorKey: 'conversionRate',
        meta: {
          filterOperator: 'eq',
        },
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return (
            <Group>
              <RingProgress
                size={25}
                roundCaps
                thickness={3}
                sections={[{ value, color: 'green' }]}
              />

              <div>
                <Text size="lg">{value}</Text>
              </div>
            </Group>
          );
        },
      },
      {
        id: 'isActive',
        accessorKey: 'isActive',
        header: translate('keywords.fields.isActive'),
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
          // <ExportButton onClick={() => handleDownload('keywords', 'keywords_export.xlsx')}>
          //   Экспортировть
          // </ExportButton>,
          <ImportButton
            variant="outline"
            schema={keywordsSchema}
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
