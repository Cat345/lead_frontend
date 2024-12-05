import { Box, SimpleGrid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { AnalyticsByQualityTable } from '../../features/analytics/ui/AnalyticsByQualityTable';
import { StatsItem } from '../../features/analytics/ui/StatsItem/StatsItem';
import { api } from '../../shared/api';
import { Loading } from '../../shared/ui/Loading';
import { mapQualityName } from '../../utils/mapQualityName';

export const AnalyticsByQuality = () => {
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
    <Box>
      <SimpleGrid cols={4} sx={{ columnGap: '1rem' }}>
        {totalCount && <StatsItem icon={null} title="Всего" value={totalCount} />}
        {qualityIndicatorsData?.map((indicator) => (
          <StatsItem
            key={indicator.quality}
            icon={null}
            title={mapQualityName(indicator.quality)}
            value={indicator.count}
          />
        ))}
      </SimpleGrid>
      <AnalyticsByQualityTable analyticsData={analyticsData} />
    </Box>
  );
};
