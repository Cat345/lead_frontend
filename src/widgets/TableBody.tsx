import './TableBody.css';

import { flexRender, RowModel } from '@tanstack/react-table';

type TableBodyProps = {
  rowModel: RowModel<any>;
};

export const TableBody: React.FC<TableBodyProps> = ({ rowModel }) => {
  const firstRow = rowModel.rows[0];
  const rowIncludeIsActive = firstRow && 'isActive' in firstRow.original;
  const rowIncludeStatus = firstRow && 'status' in firstRow.original;

  return (
    <tbody>
      {rowModel.rows.map((row, index) => {
        const canBeActive = rowIncludeIsActive || rowIncludeStatus;
        const isInactive =
          (rowIncludeIsActive && !row.original.isActive) ||
          (rowIncludeStatus && row.original.status !== 'active');

        return (
          <tr
            id={`row-${index}`}
            key={row.id}
            style={{ color: canBeActive && isInactive ? 'red' : 'green' }}
          >
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
