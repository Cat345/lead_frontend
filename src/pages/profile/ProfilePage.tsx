import { Avatar, Button, Card, Center, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useCreate, useGetIdentity } from '@refinedev/core';
import { IconUserCircle } from '@tabler/icons';
import { Link } from 'react-router-dom';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';

import { Tour } from '../../components/Tour/Tour';
import { User } from '../../models/User';
import { getConfig } from '../../shared/getConfig';

export const ProfilePage = () => {
  const { mutateAsync: createOrUpdateTgAccount } = useCreate();
  const { data: user, refetch: refetchUser } = useGetIdentity<User>();
  // const navigate = useNavigate();
  if (!user || !user.tariff) {
    return null;
  }

  const { keywordsCount, groupsCount, accountsCount } = user;
  const { maxGroups } = user.tariff;

  const addTelegramAccountToDb = (userFromTelegram: TelegramUser) => {
    const { first_name, auth_date, id, photo_url, username } = userFromTelegram;
    const telegramAccount = {
      firstName: first_name,
      authDate: auth_date,
      tgId: id,

      username: username,
      photoUrl: photo_url,

      user: {
        id: user.id,
      },
    };

    createOrUpdateTgAccount({
      // id: user.id,
      resource: 'telegram-account',
      values: telegramAccount,

      successNotification: {
        type: 'success',
        message: 'Аккаунт добавлен!',
        description: 'Telegram аккаунт добавлен',
      },
      errorNotification(error, values) {
        console.error(error, values);
        return {
          type: 'error',
          message: 'Не удалось добавить Telegram аккаунт',
          description: 'Ошибка',
        };
      },
    }).then(() => refetchUser());
  };

  return (
    <Center
      mih="70dvh"
      sx={{
        flexDirection: 'column',
      }}
    >
      <Tour />
      <Card shadow="xl" p="xl">
        <Stack align="center">
          <Avatar id="avatar" size="xl" src={null} sx={{ borderRadius: '50%' }}>
            <IconUserCircle size="70%" />
          </Avatar>
          <Text id="user-email">{user.email}</Text>
          {user.telegramAccount && (
            <>
              <Flex justify="center">
                <Text id="telegram-name">
                  {user.telegramAccount.firstName}{' '}
                  {user.telegramAccount.username && `@${user.telegramAccount.username}`}
                </Text>
              </Flex>
            </>
          )}
          <Group
            mx="sm"
            //@ts-ignore
            columnGap="sm"
            sx={{
              '@media(max-width: 380px)': {
                flexDirection: 'column',
                gap: 10,
              },
            }}
          >
            <Flex direction="column" align="center" justify="center">
              <Text>Ключевики</Text>
              <Text id="keywords-count">{keywordsCount}</Text>
            </Flex>
            <Divider orientation="vertical" />
            <Flex direction="column" align="center">
              <Text>Группы</Text>
              <Text id="groups-count">
                {maxGroups === null ? `${groupsCount} / ∞` : `${groupsCount} / ${maxGroups}`}
              </Text>
            </Flex>
            <Divider orientation="vertical" />
            <Flex direction="column" align="center">
              <Text>Аккаунты</Text>
              <Text id="accounts-count">{accountsCount}</Text>
            </Flex>
          </Group>
          <Button id="button-subscribe" component={Link} to="/pricing" fullWidth>
            Оформить подписку
          </Button>
          <Text>
            {user.telegramAccount ? 'Войти с другим аккаунтом' : 'Войти для получения уведомлений'}
          </Text>
          <div id="butotn-telegram-login">
            <TelegramLoginButton
              requestAccess={true}
              buttonSize="large"
              dataOnauth={addTelegramAccountToDb}
              botName={getConfig().TG_BOT_USERNAME}
            />
          </div>
        </Stack>
      </Card>
    </Center>
  );
};
