import { Pagination, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IResourceComponentsProps } from '@refinedev/core';
import { CreateButton, List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { IconFileImport } from '@tabler/icons';
import React from 'react';

import { ImportButton } from '../../features/import';
import { TableBody, TableBodyMobile, TableHeader } from '../../widgets';
import { schema } from './schema';
import { useColumns } from './useColumns';

export const KeywordList: React.FC<IResourceComponentsProps> = () => {
  const columns = useColumns(schema);
  const isMobile = useMediaQuery('(max-width: 600px)');
  console.log(isMobile, 'is mobile');

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  const headerGroups = getHeaderGroups();
  const rowModel = getRowModel();
  return (
    <div style={{ padding: '4px' }}>
      <List
        headerButtons={[
          <ImportButton
            variant="outline"
            schema={schema}
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
        <Pagination position="right" total={pageCount} page={current} onChange={setCurrent} />
      </List>
    </div>
  );
};
