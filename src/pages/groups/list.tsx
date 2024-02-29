import { Group, Pagination, RingProgress, Table, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslate } from '@refinedev/core';
import { CreateButton, DeleteButton, EditButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { IconFileImport } from '@tabler/icons';
import React, { useEffect, useState } from 'react';

import { Tour } from '../../components/Tour/Tour';
import { statusesRowVariants } from '../../constants/statuses';
import { ImportButton } from '../../features/import';
import { authProvider } from '../../refine/auth/authProvider';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';
import { groupsSchema } from './groupsSchema';

export const GroupList: React.FC = () => {
  const [isUserCanCreateGroup, setIsUserCanCreateGroup] = useState(true);
  const fetchUser = async () => {
    const user = await authProvider.getIdentity();
    console.log(user, 'user');
    setIsUserCanCreateGroup(user.groupsCount < user.tariff.maxGroups);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const translate = useTranslate();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const columns = [
    {
      id: 'name',
      header: translate('groups.fields.name'),
      accessorKey: 'name',
      meta: {
        filterOperator: 'contains',
      },
    },
    {
      id: 'username',
      header: translate('groups.fields.username'),
      accessorKey: 'username',
      meta: {
        filterOperator: 'contains',
      },
    },
    {
      id: 'conversionRate',
      header: translate('groups.fields.conversionRate'),
      accessorKey: 'conversionRate',
      meta: {
        filterOperator: 'contains',
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
      id: 'status',
      header: translate('groups.fields.status'),
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const value = getValue();
        const translatedValue = statusesRowVariants.find((status) => status.value === value);
        return translatedValue?.label || 'Статус не найден';
      },
      meta: {
        filterOperator: 'eq',
      },
    },
    {
      id: 'actions',
      accessorKey: 'id',
      header: translate('table.actions'),
      cell: ({ getValue, row }) => {
        const { index } = row;
        return (
          <Group spacing="xs" noWrap>
            <EditButton hideText recordItemId={getValue() as string} id={`edit-button-${index}`} />
            <DeleteButton
              id={`delete-button-${index}`}
              hideText
              recordItemId={getValue() as string}
              onSuccess={() => {
                console.log('deleted?');
                fetchUser();
              }}
            />
          </Group>
        );
      },
      meta: {
        filterOperator: false,
      },
    },
  ];

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

  console.log(isUserCanCreateGroup, 'is user can create group');
  const headerButtons = isUserCanCreateGroup
    ? [
        <ImportButton
          key={1}
          handleSetUserGroupsCount={() => {
            fetchUser();
          }}
          variant="outline"
          schema={groupsSchema}
          leftIcon={<IconFileImport size="1rem" />}
        />,
        <CreateButton key={2}>Создать</CreateButton>,
      ]
    : [];

  return (
    <div style={{ padding: '4px', paddingBottom: '50px' }}>
      <Tour />
      <List headerButtons={headerButtons} canCreate={true}>
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
