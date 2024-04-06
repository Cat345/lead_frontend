import { LogicalFilter } from '@refinedev/core';

const normalizeOperator = ({ operator }: Pick<LogicalFilter, 'operator'>) => {
  switch (operator) {
    case 'contains':
      return '~';
    case 'ne':
      return '!';
    case 'gt':
      return '>';
    case 'gte':
      return '>=';
    case 'lt':
      return '<';
    case 'lte':
      return '<=';
  }
  return '';
};

export const generateFilter = (filters?: LogicalFilter[]) => {
  console.log(filters, 'filtes');
  if (!filters) {
    return '';
  }

  const initialString = 'filter=';
  const filterString = filters.reduce((string, filter) => {
    const { field, value } = filter;
    const operator = normalizeOperator(filter);
    return (string += field + '=' + operator + value + ';');
  }, initialString);
  console.log(filterString);

  return filterString;

  // const queryFilters: { [key: string]: string } = {};

  // if (filters) {
  //   filters.map((filter) => {
  //     if (filter.operator === 'or' || filter.operator === 'and') {
  //       throw new Error(
  //         `[@refinedev/simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`
  //       );
  //     }

  //     if ('field' in filter) {
  //       const { field, operator, value } = filter;

  //       if (field === 'q') {
  //         queryFilters[field] = value;
  //         return;
  //       }

  //       const mappedOperator = mapOperator(operator);
  //       queryFilters[`${field}${mappedOperator}`] = value;
  //     }
  //   });
  // }

  return queryFilters;
};
