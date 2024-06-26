import { Box, Group } from '@mantine/core';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

import { ColumnFilter } from '../refine/table/ColumnFilter';
import { ColumnSorter } from '../refine/table/ColumnSorter';

type TableHeaderProps = {
  headerGroups: HeaderGroup<unknown>[];
};

export const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            return (
              <th id={`header-row-${index}`} key={header.id}>
                {!header.isPlaceholder && (
                  <Group spacing="xs" noWrap>
                    <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                    <Group spacing="xs" noWrap>
                      <ColumnSorter column={header.column} />
                      <ColumnFilter column={header.column} />
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
