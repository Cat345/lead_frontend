import { Group, Paper, Text } from '@mantine/core';

interface StatsItemProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}
export const StatsItem = ({ icon, title, value }: StatsItemProps) => {
  return (
    <Paper withBorder p="md" radius="md" miw={100}>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Text size="xs" c="dimmed">
          {title}
        </Text>
        {icon}
      </Group>

      <Group align="flex-end" sx={{ justifyContent: 'space-between' }}>
        <Text weight={500}>{value}</Text>
      </Group>
      {/* <Group align="flex-end" gap="xs" mt={25}>
        <Text className={classes.value}>{stat.value}</Text>
        <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
          <span>{stat.diff}%</span>
          <DiffIcon size={16} stroke={1.5} />
        </Text>
      </Group> */}

      {/* <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text> */}
    </Paper>
  );
};
