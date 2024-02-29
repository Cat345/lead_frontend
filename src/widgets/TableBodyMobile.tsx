import { Grid, Paper } from '@mantine/core';
import { flexRender, RowModel } from '@tanstack/react-table';

type TableBodyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowModel: RowModel<any>;
};

export const TableBodyMobile: React.FC<TableBodyProps> = ({ rowModel }) => {
  const firstRow = rowModel.rows[0];
  const rowIncludeIsActive = firstRow && 'isActive' in firstRow.original;
  const rowIncludeStatus = firstRow && 'status' in firstRow.original;

  return (
    <div>
      {rowModel.rows.map((row, index) => {
        const canBeActive = rowIncludeIsActive || rowIncludeStatus;
        const isInactive =
          (rowIncludeIsActive && !row.original.isActive) ||
          (rowIncludeStatus && row.original.status !== 'active');

        return (
          <Paper id={`row-${index}`} shadow="md" mb="sm" p="sm">
            {row.getVisibleCells().map((cell, index) => {
              return (
                <Grid key={cell.id} gutter="lg" id={`row-${index}`}>
                  <Grid.Col span={4}>
                    <span>{cell.column.columnDef.header}:</span>
                  </Grid.Col>
                  <Grid.Col span={8} style={{ color: canBeActive && isInactive ? 'red' : 'green' }}>
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
