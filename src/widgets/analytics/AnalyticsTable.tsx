import { Badge } from '@mantine/core';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { MRT_Localization_RU } from 'mantine-react-table/locales/ru';
import { useMemo } from 'react';

type AnalyticsData = {
  groupName: string;
  keywordName: string;
  quality: string;
  leadText: string;
};
export const AnalyticsTable = ({ analyticsData }: { analyticsData: AnalyticsData[] }) => {
  const columns = useMemo<MRT_ColumnDef<AnalyticsData>[]>(
    () => [
      {
        accessorKey: 'keywordName',
        header: 'Ключевик',
      },
      {
        accessorKey: 'groupName',
        header: 'Группа',
      },

      {
        accessorKey: 'leadText',
        header: 'Лид',
        Cell: ({ renderedCellValue }) => {
          return <div dangerouslySetInnerHTML={{ __html: renderedCellValue?.toString() || '' }} />;
        },
      },
      {
        accessorKey: 'quality',
        header: 'Качество',
        Cell: ({ renderedCellValue }) => {
          const value = renderedCellValue;
          const qualityName =
            value === 'good' ? 'Хороший' : value === 'bad' ? 'Плохой' : 'Нейтральный';
          return (
            <Badge color={value === 'good' ? 'green' : value === 'bad' ? 'red' : 'yellow'}>
              {qualityName}
            </Badge>
          );
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: analyticsData,
    enablePagination: true,
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableGrouping: true,
    enableFilters: false,
    enableRowDragging: false,
    enablePinning: false,
    enableColumnDragging: false,
    mantineTableProps: {
      highlightOnHover: false,
      withColumnBorders: true,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 100,
      },
      grouping: ['keywordName'],
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ['10', '50', '100'],
    },
    enableBottomToolbar: true,
    paginationDisplayMode: 'pages',
    paginateExpandedRows: true,
    localization: {
      actions: 'Действия',
      and: 'И',
      cancel: 'Отмена',
      changeFilterMode: 'Изменить режим фильтрации',
      changeSearchMode: 'Изменить режим поиска',
      clearFilter: 'Очистить фильтр',
      clearSearch: 'Очистить поиск',
      clearSort: 'Очистить сортировку',
      clickToCopy: 'Нажмите для копирования',
      collapse: 'Свернуть',
      collapseAll: 'Свернуть все',
      columnActions: 'Действия',
      copiedToClipboard: 'Скопировано в буфер обмена',
      create: 'Создать',
      dropToGroupBy: 'Перетащить для группировки',
      edit: 'Редактировать',
      expand: 'Развернуть',
      expandAll: 'Развернуть все',
      filterArrIncludes: 'Фильтр включает',
      filterArrIncludesAll: 'Фильтр включает все',
      filterArrIncludesSome: 'Фильтр включает некоторые',
      filterBetween: 'Фильтр между',
      filterBetweenInclusive: 'Фильтр между включительно',
      filterByColumn: 'Фильтр по столбцу',
      filterContains: 'Фильтр содержит',
      filterEmpty: 'Фильтр пуст',
      filterEndsWith: 'Фильтр заканчивается',
      filterEquals: 'Фильтр равен',
      filterEqualsString: 'Фильтр равен строке',
      filterFuzzy: 'Фильтр похож',
      filterGreaterThan: 'Фильтр больше',
      filterGreaterThanOrEqualTo: 'Фильтр больше или равен',
      filterInNumberRange: 'Фильтр в диапазоне',
      filterIncludesString: 'Фильтр включает строку',
      filterIncludesStringSensitive: 'Фильтр включает строку (чувствительно к регистру)',
      filterLessThan: 'Фильтр меньше',
      filterLessThanOrEqualTo: 'Фильтр меньше или равен',
      filterMode: 'Режим фильтрации',
      filterNotEmpty: 'Фильтр не пуст',
      filterNotEquals: 'Фильтр не равен',
      filterStartsWith: 'Фильтр начинается',
      filterWeakEquals: 'Фильтр приблизительно равен',
      filteringByColumn: 'Фильтрация по столбцу',
      goToFirstPage: 'Перейти к первой странице',
      goToLastPage: 'Перейти к последней странице',
      goToNextPage: 'Перейти к следующей странице',
      goToPreviousPage: 'Перейти к предыдущей странице',
      grab: 'Перетащить',
      groupByColumn: 'Сгруппировать по столбцу',
      groupedBy: 'Сгруппировано по',
      hideAll: 'Скрыть все',
      hideColumn: 'Скрыть столбец',
      max: 'Максимум',
      min: 'Минимум',
      move: 'Переместить',
      noRecordsToDisplay: 'Нет данных для отображения',
      noResultsFound: 'Ничего не найдено',
      of: 'из',
      or: 'или',
      pinToLeft: 'Закрепить слева',
      pinToRight: 'Закрепить справа',
      resetColumnSize: 'Сбросить размер столбца',
      resetOrder: 'Сбросить порядок',
      rowActions: 'Действия',
      rowNumber: 'Номер строки',
      rowNumbers: 'Номера строк',
      rowsPerPage: 'Строк на странице',
      save: 'Сохранить',
      search: 'Поиск',
      select: 'Выбрать',
      selectedCountOfRowCountRowsSelected: 'Выбрано {selectedCount} из {rowCount} строк',
      showAll: 'Показать все',
      showAllColumns: 'Показать все столбцы',
      showHideColumns: 'Показать/скрыть столбцы',
      showHideFilters: 'Показать/скрыть фильтры',
      showHideSearch: 'Показать/скрыть поиск',
      sortByColumnAsc: 'Сортировать по столбцу по возрастанию',
      sortByColumnDesc: 'Сортировать по столбцу по убыванию',
      sortedByColumnAsc: 'Отсортировано по возрастанию',
      sortedByColumnDesc: 'Отсортировано по убыванию',
      thenBy: 'Затем по',
      toggleDensity: 'Изменить плотность',
      toggleFullScreen: 'Перейти в полноэкранный режим',
      toggleSelectAll: 'Выбрать все',
      toggleSelectRow: 'Выбрать строку',
      toggleVisibility: 'Показать/скрыть',
      ungroupByColumn: 'Разгруппировать по столбцу',
    },
  });

  return <MantineReactTable table={table} />;
};
