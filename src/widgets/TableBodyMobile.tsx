import { Grid, Paper } from '@mantine/core';
import { flexRender, RowModel } from '@tanstack/react-table';

type TableBodyProps = {
  rowModel: RowModel<any>;
};

export const TableBodyMobile: React.FC<TableBodyProps> = ({ rowModel }) => {
  return (
    <div>
      {rowModel.rows.map((row) => {
        return (
          <Paper shadow="md" mb="sm" p="sm">
            {row.getVisibleCells().map((cell) => {
              return (
                <Grid key={cell.id} gutter="lg">
                  <Grid.Col span={4}>
                    <span>{cell.column.columnDef.header}:</span>
                  </Grid.Col>
                  <Grid.Col
                    span={8}
                    style={{
                      color: row.original.isActive ? 'green' : 'red',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Grid.Col>
                </Grid>
              );
            })}
          </Paper>
        );
      })}
    </div>
  );
};
