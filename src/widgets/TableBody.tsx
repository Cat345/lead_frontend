import { flexRender, RowModel } from '@tanstack/react-table';

type TableBodyProps = {
  rowModel: RowModel<any>;
};

export const TableBody: React.FC<TableBodyProps> = ({ rowModel }) => {
  return (
    <tbody>
      {rowModel.rows.map((row) => {
        return (
          <tr key={row.id} style={{ color: row.original.isActive ? 'green' : 'red' }}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
