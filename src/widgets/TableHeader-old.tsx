import { Box, Group } from '@mantine/core';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

import { ColumnSorter } from '../refine/table/ColumnSorter';

type TableHeaderProps = {
  headerGroups: HeaderGroup<unknown>[];
};

export const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th key={header.id}>
                {!header.isPlaceholder && (
                  <Group spacing="xs" noWrap>
                    <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                    <Group spacing="xs" noWrap>
                      <ColumnSorter column={header.column} />
                    </Group>
                  </Group>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
