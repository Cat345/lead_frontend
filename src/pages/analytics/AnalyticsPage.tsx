import { Paper, Tabs, Title } from '@mantine/core';

import { AnalyticsByGroup } from './AnalyticsByGroup';
import { AnalyticsByKeyword } from './AnalyticsByKeyword';
import { AnalyticsByQuality } from './AnalyticsByQuality';

export default function AnalyticsList() {
  return (
    <Paper p="lg" mb="lg">
      <Title order={3} mb="md">
        Аналитика
      </Title>
      <Tabs keepMounted={false} defaultValue="quality">
        <Tabs.List mb="md">
          <Tabs.Tab sx={{ transition: '.3s' }} value="quality">
            По качеству
          </Tabs.Tab>
          <Tabs.Tab sx={{ transition: '.3s' }} value="keyword">
            По ключевикам
          </Tabs.Tab>
          <Tabs.Tab sx={{ transition: '.3s' }} value="group">
            По группам
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="quality">
          <AnalyticsByQuality />
        </Tabs.Panel>
        <Tabs.Panel value="keyword">
          <AnalyticsByKeyword />
        </Tabs.Panel>
        <Tabs.Panel value="group">
          <AnalyticsByGroup />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
