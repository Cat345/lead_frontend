import { Anchor, Button, Checkbox, Group, Pagination, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IResourceComponentsProps, useDeleteMany, useTranslate } from '@refinedev/core';
import { DeleteButton, ExportButton, List, useSelect } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { handleDownload } from '../../utils/downloadResource';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';

export const LeadList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { mutate } = useDeleteMany();

  const deleteSelectedItems = (ids: number[]) => {
    mutate(
      {
        resource: 'leads',
        ids,
      },
      {
        onSuccess: () => {
          resetRowSelection();
        },
      }
    );
  };

  const { selectProps: filterSelectProps } = useSelect({
    resource: 'leads',
  });

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'selection',
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
                    // deleteSelectedItems(
                    //   table.getSelectedRowModel().flatRows.map(({ original }) => original.id)
                    // )
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
              {/* <ActionIcon size="xs" onClick={() => row.toggleExpanded()}>
                {row.getIsExpanded() ? <IconChevronDown /> : <IconChevronRight />}
              </ActionIcon> */}
            </Group>
          );
        },
      },
      {
        id: 'text',
        accessorKey: 'text',
        header: translate('leads.fields.text'),
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: translate('leads.fields.date'),
        meta: {
          filterOperator: 'eq',
        },
      },
      {
        id: 'keyword.name',
        accessorKey: 'keyword.name',
        header: translate('keywords.titles.show'),
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'group.name',
        accessorKey: 'group.name',
        header: translate('groups.titles.show'),
        meta: {
          filterOperator: 'contains',
        },
      },
      {
        id: 'messageSender.id',
        accessorKey: 'messageSender.username',
        header: translate('messageSenders.titles.show'),
        meta: {
          filterOperator: 'contains',
        },
        cell: function render({ getValue }) {
          return (
            <Anchor
              sx={{ color: 'inherit', textDecoration: 'underline' }}
              href={`https://t.me/${getValue()}`}
              target="_blank"
            >
              {getValue() as string}
            </Anchor>
          );
        },
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: translate('table.actions'),
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <DeleteButton hideText recordItemId={getValue() as string} />
            </Group>
          );
        },
      },
    ],
    [filterSelectProps.data]
  );
  const isMobile = useMediaQuery('(max-width: 600px)');

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
    resetRowSelection,
  } = useTable({
    columns,
    getRowId: (originalRow) => originalRow.id.toString(),
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
        canCreate={false}
        headerButtons={[
          <ExportButton onClick={() => handleDownload('leads', 'leads_export.xlsx')}>
            Экспортировтьировть
          </ExportButton>,
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
};
