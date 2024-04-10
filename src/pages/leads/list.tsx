import { Group, Pagination, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';

export const LeadList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
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
        id: 'actions',
        accessorKey: 'id',
        header: translate('table.actions'),
        cell: function render({ getValue, row }) {
          const { index } = row;
          return (
            <Group spacing="xs" noWrap>
              {/* <EditButton
                id={`button-edit-${index}`}
                hideText
                recordItemId={getValue() as string}
              /> */}
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
  } = useTable({
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
        canCreate={false}
        // headerButtons={[
        //   <ImportButton
        //     variant="outline"
        //     schema={leadsSchema}
        //     leftIcon={<IconFileImport size="1rem" />}
        //   />,
        //   <CreateButton>Создать</CreateButton>,
        // ]}
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
