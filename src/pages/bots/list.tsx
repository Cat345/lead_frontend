import { ActionIcon, Box, Group, Table, Text } from '@mantine/core';
import { useCreate, useList } from '@refinedev/core';
import { IconEdit, IconRefresh } from '@tabler/icons';
import { Link } from 'react-router-dom';

import { Bot } from '../../models/Bot';
import { Loading } from '../../shared/ui/Loading';

export const BotsList = () => {
  const { mutate } = useCreate();
  const botsQuery = useList<Bot>({
    resource: 'bots',
  });

  if (botsQuery.isLoading) {
    return <Loading />;
  }

  const handleRestartBot = (link: string, id: number) => {
    mutate({
      resource: `bots/restart-bot/${id}`,
      values: {},
      successNotification(data, values, resource) {
        console.log('successNotification', data, values, resource);
        return {
          message: data?.data?.message || 'Бот перезапущен',
          type: 'success',
        };
      },
      errorNotification(error, values, resource) {
        console.log('errorNotification', error, values, resource);
        return {
          message: error?.response?.data?.message || 'Ошибка при перезапуске бота',
          type: 'error',
        };
      },
    });
  };

  const rows = botsQuery.data?.data?.map((bot) => (
    <tr key={bot.id}>
      <td>{bot.id}</td>
      <td>{bot.link}</td>
      <td>{bot.limitation}</td>
      <td>
        <Group spacing="xs">
          <ActionIcon
            variant="outline"
            size="xs"
            onClick={() => handleRestartBot(bot.link, bot.id)}
          >
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
