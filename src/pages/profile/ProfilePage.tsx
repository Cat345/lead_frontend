import {
  Avatar,
  Button,
  Card,
  Center,
  Checkbox,
  Divider,
  Flex,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useGetIdentity, useUpdate } from '@refinedev/core';
import { IconUserCircle } from '@tabler/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TelegramLoginButton from 'telegram-login-button';

import { useAddTelegramAccountToDb } from '../../features/telegram/lib/useAddTelegramAccountToDb';
import { User } from '../../models/User';
import { UserSetting } from '../../models/UserSetting';
import { getConfig } from '../../shared/getConfig';

export const ProfilePage = () => {
  const { data: user, refetch: refetchUser } = useGetIdentity<User>();
  const { mutateAsync: update } = useUpdate();
  const addTelegramAccountToDb = useAddTelegramAccountToDb();

  const [maxMessageLength, setMaxMessageLength] = useState<number | undefined>(
    user?.userSetting?.maxMessageLength
  );
  const [isModalOpened, setIsModalOpened] = useState(false);

  if (!user || !user.tariff) {
    return null;
  }

  console.log(user.userSetting, 'user settings');

  const updateUserSettings = (settingsId: number, settings: Partial<UserSetting>) =>
    update({
      resource: 'user-settings',
      id: settingsId,
      values: settings,
      successNotification: {
        type: 'success',
        message: 'Настройки сохранены',
        description: 'Максимальная длина изменена',
      },
    }).then(() => refetchUser());

  const saveMaxMessageLength = () => {
    console.log(maxMessageLength, 'maxMessageLength');
    if (maxMessageLength !== undefined && user.userSetting) {
      updateUserSettings(user.userSetting.id, {
        maxMessageLength,
      }).then(() => refetchUser());
    }
  };

  const numberInputElement = (
    <NumberInput
      formatter={(value) => {
        if (!value) return '1';
        if (Number.isNaN(parseFloat(value))) return '1';
        const numberValue = parseInt(value);
        if (numberValue < 1) return '1';
        return numberValue.toString();
      }}
      value={maxMessageLength}
      min={1}
      onChange={(value) => {
        if (!value || value < 1) {
          setMaxMessageLength(1);
        } else {
          setMaxMessageLength(value);
        }
      }}
      label="Максимальная длина (в символах)"
      rightSectionWidth={150}
      rightSection={
        <Button w="150px" onClick={saveMaxMessageLength}>
          Сохранить
        </Button>
      }
    />
  );
  console.log(user, 'user');

  const shouldIgnoreMixedLanguageCheckbox = (
    <Checkbox
      label="Игнорировать сообщения со словами, написанными с обходом стоп-слов"
      checked={user.userSetting?.shouldIgnoreMixedLanguage}
      onChange={(event) => {
        updateUserSettings(user.userSetting?.id, {
          shouldIgnoreMixedLanguage: event.currentTarget.checked,
        });
      }}
    />
  );

  const { keywordsCount, groupsCount, accountsCount } = user;
  const { maxGroups } = user.tariff;
  return (
    <Center
      mih="70dvh"
      sx={{
        flexDirection: 'column',
      }}
    >
      <Modal opened={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <div>
          <div>
            <Title order={5} mb="sm" sx={{ textAlign: 'center' }}>
              Уведомления
            </Title>
            <Text>
              {user.telegramAccount
                ? `Аккаунт @${user.telegramAccount.username} уже привязан, но его можно изменить`
                : 'Привязать Telegram аккаунт для получения уведомлений'}
            </Text>
            <TelegramLoginButton
              requestAccess={true}
              buttonSize="large"
              dataOnauth={(tgUser) =>
                addTelegramAccountToDb(tgUser, user.id).then(() => refetchUser())
              }
              botName={getConfig().TG_BOT_USERNAME}
            />
          </div>
          <div>
            <Title order={5} mb="sm" sx={{ textAlign: 'center' }}>
              Сообщения
            </Title>
            <Stack>
              {numberInputElement}
              {shouldIgnoreMixedLanguageCheckbox}
            </Stack>
          </div>
        </div>
      </Modal>
      {/* <Tour /> */}
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
          <Button onClick={() => setIsModalOpened(true)} variant="outline" fullWidth>
            Настройки
          </Button>
        </Stack>
      </Card>
    </Center>
  );
};
