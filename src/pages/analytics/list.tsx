import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../shared/api';
import { Loading } from '../../shared/ui/Loading';
import { AnalyticsTable } from '../../widgets/analytics/AnalyticsTable';

export default function AnalyticsList() {
  const analyticsQuery = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await api.get('/analytics');
      return response.data;
    },
  });

  if (analyticsQuery.isLoading) return <Loading />;
  const analyticsData = analyticsQuery.data;
  return (
    <Box style={{ paddingBottom: '90px' }}>
      <AnalyticsTable analyticsData={analyticsData} />
    </Box>
  );
}
