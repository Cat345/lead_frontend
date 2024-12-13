import { Anchor, Button, Checkbox, Group, Pagination, Table, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IResourceComponentsProps, useDeleteMany, useTranslate } from '@refinedev/core';
import { DeleteButton, ExportButton, List, useSelect } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { IconHandFinger } from '@tabler/icons';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { api } from '../../shared/api';
import { TreePositionedToggler } from '../../shared/ui/TreePositionedToggler';
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

  const handleChangeQuality = (id: number, quality: string) => {
    api.patch(`/leads/${id}`, { quality });
  };

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
        cell: function render({ getValue, row }) {
          const value = getValue() as string;
          if (!row.original.link) {
            return <Text dangerouslySetInnerHTML={{ __html: value }} />;
          }
          return (
            <Text>
              <Anchor
                href={row.original.link}
                target="_blank"
                sx={{ textDecoration: 'underline', color: 'inherit' }}
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </Text>
          );
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
          const value = getValue() as string;
          if (!value) return <Text>Неизвестен</Text>;

          return (
            <Anchor
              sx={{ color: 'inherit', textDecoration: 'underline' }}
              href={`https://t.me/${value}`}
              target="_blank"
            >
              {getValue() as string}
            </Anchor>
          );
        },
      },
      {
        id: 'quality',
        accessorKey: 'quality',
        header: translate('leads.fields.quality'),
        meta: {
          filterOperator: 'eq',
        },
        cell: function render({ row }) {
          const { quality, isQualityChangedAutomatically } = row.original;
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span
                title="Изменён вручную"
                style={{
                  height: '1.2rem',
                  width: '1.2rem',
                  display: isQualityChangedAutomatically ? 'none' : 'flex',
                  border: '1px solid gray',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1px',
                }}
              >
                <IconHandFinger color="gray" />
              </span>
              <TreePositionedToggler
                value={quality}
                onChange={(value) => handleChangeQuality(row.original.id, value)}
              />
            </div>
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
            Экспортировать
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
