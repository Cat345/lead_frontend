import { Group } from '@mantine/core';
import { useTranslate } from '@refinedev/core';
import { BooleanField, DeleteButton, EditButton, ShowButton } from '@refinedev/mantine';
import { IconCheck, IconX } from '@tabler/icons';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { CustomSchema } from '../../shared/types/CustomSchema';
import { RestartButton } from '../accounts/RestartButton';

export const useColumns = (schema: CustomSchema) => {
  const translate = useTranslate();

  const cells = {
    isActive: function render({ getValue }: { getValue: any }) {
      return (
        <BooleanField
          value={getValue() === true}
          trueIcon={<IconCheck />}
          falseIcon={<IconX />}
          valueLabelTrue="Активен"
          valueLabelFalse="Неактивен"
        />
      );
    },
  } as any;

  const columns = React.useMemo<ColumnDef<any>[]>(
    () =>
      schema.map((column) => {
        const withoutCell = {
          id: column.prop,
          accessorKey: column.prop,
          header: column.header,
        };

        const cell = cells[column.prop];
        if (cell) {
          return {
            ...withoutCell,
            cell,
          };
        }

        return withoutCell;
      }),
    [translate]
  );

  return [
    ...columns,
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
            <RestartButton hideText recordItemId={getValue() as string} />
          </Group>
        );
      },
    },
  ];
};
