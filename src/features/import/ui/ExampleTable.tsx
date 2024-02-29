import { Box, BoxProps, Table, Text } from '@mantine/core';
import { Schema } from 'read-excel-file';

type ExampleTableProps = {
  schema: Schema;
} & BoxProps;

export const ExampleTable = ({ schema, ...props }: ExampleTableProps) => {
  const headerRows = Object.keys(schema).map((headerName) => (
    <th key={headerName}>{headerName}</th>
  ));

  const rows = Object.values(schema).map((element) => <td key={element.prop}>{element.prop}</td>);
  return (
    <Box {...props} id="example-import-table">
      <Text>Пример:</Text>

      <Table withBorder withColumnBorders width="100%">
        <thead>
          <tr>{headerRows}</tr>
        </thead>
        <tbody>
          <tr>{rows}</tr>
        </tbody>
      </Table>
    </Box>
  );
};
