import 'dayjs/locale/ru';

import { SimpleGrid, Stack } from '@mantine/core';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { useLocalStorage } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import SuperJSON from 'superjson';

import { AnalyticsByQualityTable } from '../../features/analytics/ui/AnalyticsByQualityTable';
import { StatsItem } from '../../features/analytics/ui/StatsItem/StatsItem';
import { api } from '../../shared/api';
import { Loading } from '../../shared/ui/Loading';
import { mapQualityName } from '../../utils/mapQualityName';

export const AnalyticsByQuality = () => {
  const defaultValue: DateRangePickerValue = [new Date(), new Date()];
  const [value, setValue] = useLocalStorage({
    key: 'analytics-by-quality-date-range',
    defaultValue,
    serialize: SuperJSON.stringify,
    deserialize: (str) => {
      return str === undefined ? defaultValue : SuperJSON.parse(str);
    },
  });
  const analyticsQuery = useQuery({
    queryKey: ['analytics', new Date(value[0]).getTime(), new Date(value[1]).getTime()],
    enabled: !!value[0] && !!value[1],
    queryFn: async () => {
      const response = await api.get('/analytics/by-quality', {
        params: {
          startDate: value[0].toISOString(),
          endDate: value[1].toISOString(),
        },
      });
      return response.data;
    },
  });

  const qualityIndicatorsQuery = useQuery<{ count: number; quality: string }[]>({
    queryKey: ['quality-indicators', new Date(value[0]).getTime(), new Date(value[1]).getTime()],
    enabled: !!value[0] && !!value[1],
    queryFn: async () => {
      const response = await api.get('/analytics/indicators/quality/all', {
        params: {
          startDate: value[0].toISOString(),
          endDate: value[1].toISOString(),
        },
      });
      return response.data;
    },
  });

  if (analyticsQuery.isLoading || qualityIndicatorsQuery.isLoading) return <Loading />;
  const analyticsData = analyticsQuery.data;
  const qualityIndicatorsData = qualityIndicatorsQuery.data;

  const totalCount = qualityIndicatorsData?.reduce((acc, curr) => acc + +curr.count, 0);

  return (
    <Stack spacing="md">
      <DateRangePicker
        clearable={false}
        locale="ru"
        placeholder="Выберите даты"
        value={value}
        onChange={setValue}
      />
      <SimpleGrid mb="md" cols={4} sx={{ columnGap: '1rem' }}>
        {totalCount && <StatsItem icon={null} title="Всего" value={totalCount} />}
        {qualityIndicatorsData?.map((indicator) => (
          <StatsItem
            key={indicator.quality}
            icon={null}
            title={mapQualityName(indicator.quality, { isPlural: true })}
            value={indicator.count}
          />
        ))}
      </SimpleGrid>
      <AnalyticsByQualityTable analyticsData={analyticsData} />
    </Stack>
  );
};
