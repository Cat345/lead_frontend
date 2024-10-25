import { ActionIcon, Box, Group, Table, Text } from '@mantine/core';
import { useList } from '@refinedev/core';
import { IconEdit, IconRefresh } from '@tabler/icons';
import { Link } from 'react-router-dom';

import { Loading } from '../../shared/ui/Loading';

export const BotsList = () => {
  const botsQuery = useList({
    resource: 'bots',
  });

  if (botsQuery.isLoading) {
    return <Loading />;
  }

  const restartBot = (id: number) => {
    console.log('restartBot', id);
  };

  const rows = botsQuery.data?.data?.map((bot) => (
    <tr key={bot.id}>
      <td>{bot.id}</td>
      <td>{bot.link}</td>
      <td>{bot.limitation}</td>
      <td>
        <Group spacing="xs">
          <ActionIcon variant="outline" size="xs">
            <IconRefresh />
          </ActionIcon>
          <ActionIcon component={Link} to={`/bots/edit/${bot.id}`} variant="outline" size="xs">
            <IconEdit />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Box p="md">
      <Text size="xl" weight={700} mb="md">
        Список ботов
      </Text>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ссылка</th>
            <th>Лимит групп</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};
