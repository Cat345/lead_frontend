import { Box, Tabs, Title } from '@mantine/core';

import { AnalyticsByQuality } from './AnalyticsByQuality';

export default function AnalyticsList() {
  return (
    <Box p="lg" bg="white" mb="lg">
      <Title order={3}>Аналитика</Title>
      <Tabs keepMounted={false} defaultValue="quality">
        <Tabs.List mb="md">
          <Tabs.Tab sx={{ transition: '.3s' }} value="quality">
            По качеству
          </Tabs.Tab>
          <Tabs.Tab sx={{ transition: '.3s' }} value="lead">
            По лидам
          </Tabs.Tab>
          <Tabs.Tab sx={{ transition: '.3s' }} value="group">
            По группам
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="quality">
          <AnalyticsByQuality />
        </Tabs.Panel>
        <Tabs.Panel value="lead">
          <Box />
        </Tabs.Panel>
        <Tabs.Panel value="group">
          <Box />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
