import { Group, Pagination, Table, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CanAccess, useTranslate, useUpdate } from '@refinedev/core';
import { CreateButton, DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { Tour } from '../../components/Tour/Tour';
import { statusesRowVariants } from '../../constants/statuses';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';
import { RestartButton } from './RestartButton';

export const AccountList: React.FC = () => {
  const translate = useTranslate();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { mutate: restartAccount } = useUpdate();
  const handleClickRestart = (id: number) => {
    restartAccount({
      values: {
        status: 'active',
      },
      id,
      resource: 'accounts',
      successNotification: {
        message: 'Аккаунт перезагружен',
        type: 'success',
        description: 'Успешно',
      },
      errorNotification: {
        message: 'Аккаунт не может быть перезагружен',
        type: 'error',
        description: 'Ошибка',
      },
    });
  };

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'phone',
        header: translate('accounts.fields.phone'),
        accessorKey: 'phone',
        meta: {
          filterOperator: 'eq',
        },
      },
      {
        id: 'type',
        header: translate('accounts.fields.type'),
        accessorKey: 'type',
        meta: {
          filterOperator: 'eq',
        },
      },
      {
        id: 'status',
        header: translate('accounts.fields.status'),
        accessorKey: 'status',
        cell: function render({ getValue }) {
          const value = getValue();
          const translatedValue = statusesRowVariants.find((status) => status.value === value);
          return <Text>{translatedValue?.label || 'Статус не найден'}</Text>;
        },
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
              <EditButton
                id={`edit-button-${index}`}
                hideText
                recordItemId={getValue() as string}
              />
              <DeleteButton
                id={`delete-button-${index}`}
                hideText
                recordItemId={getValue() as string}
              />
              <RestartButton
                id={`restart-button-${index}`}
                meta={{
                  id: getValue(),
                }}
                onClick={handleClickRestart}
                hideText
                recordItemId={getValue() as string}
              />
            </Group>
          );
        },
        meta: {
          filterOperator: false,
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
    <CanAccess
      resource="accounts"
      action="list"
      params={{ id: 1 }}
      fallback={<h3>У вас нет доступа</h3>}
    >
      <Tour />
      <div style={{ padding: '4px', paddingBottom: '50px' }}>
        <List headerButtons={[<CreateButton>Создать</CreateButton>]}>
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
    </CanAccess>
  );
};
