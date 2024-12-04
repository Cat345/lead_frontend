import { Box, Group, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../shared/api';
import { Loading } from '../../shared/ui/Loading';
import { mapQualityName } from '../../utils/mapQualityName';
import { AnalyticsTable } from '../../widgets/analytics/AnalyticsTable';

export default function AnalyticsList() {
  const analyticsQuery = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await api.get('/analytics/by-quality/70');
      return response.data;
    },
  });

  const qualityIndicatorsQuery = useQuery<{ count: number; quality: string }[]>({
    queryKey: ['quality-indicators'],
    queryFn: async () => {
      const response = await api.get('/analytics/indicators/quality/all');
      return response.data;
    },
  });

  if (analyticsQuery.isLoading || qualityIndicatorsQuery.isLoading) return <Loading />;
  const analyticsData = analyticsQuery.data;
  const qualityIndicatorsData = qualityIndicatorsQuery.data;

  const totalCount = qualityIndicatorsData?.reduce((acc, curr) => acc + +curr.count, 0);
  return (
    <Box style={{ paddingBottom: '90px' }}>
      <Group sx={{ columnGap: '1rem' }}>
        {totalCount && <Text>Количество:</Text>}
        {qualityIndicatorsData?.map((indicator) => (
          <div key={indicator.quality}>
            <Text>
              {mapQualityName(indicator.quality)}: {indicator.count}
            </Text>
          </div>
        ))}
      </Group>
      <Group sx={{ columnGap: '1rem' }}>
        <Text>Всего: {totalCount}</Text>
      </Group>
      <AnalyticsTable analyticsData={analyticsData} />
    </Box>
  );
}
