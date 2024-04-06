import { Group, Pagination, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IResourceComponentsProps, useTranslate } from '@refinedev/core';
import { BooleanField, CreateButton, DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { IconCheck, IconFileImport, IconX } from '@tabler/icons';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { ImportButton } from '../../features/import';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';
import { stopwordsSchema } from './stopwordsSchema';

export const StopwordList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  // const columns = useColumns(schema);
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
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
};
