import { Group, Paper, Text } from '@mantine/core';

interface StatsItemProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}
export const StatsItem = ({ icon, title, value }: StatsItemProps) => {
  let color = 'gray';
  switch (title) {
    case 'Хороших':
      color = 'green';
      break;
    case 'Нейтральных':
      color = 'yellow';
      break;
    case 'Плохих':
      color = 'red';
      break;
  }
  return (
    <Paper p="md" radius="md" miw={100} bg={color + '.1'}>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Text size="xs" color="black">
          {title}
        </Text>
        {icon}
      </Group>

      <Group align="flex-end" sx={{ justifyContent: 'space-between' }}>
        <Text c={color + '.9'} weight={500} fz="lg">
          {value}
        </Text>
      </Group>
    </Paper>
  );
};
