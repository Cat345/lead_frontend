import { Paper, Stack, Text } from '@mantine/core';
import { useGetIdentity } from '@refinedev/core';
import React, { ReactNode } from 'react';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';

import { useAddTelegramAccountToDb } from '../features/telegram/lib/useAddTelegramAccountToDb';
import { User } from '../models/User';
import { getConfig } from '../shared/getConfig';

export const ForRegisteredInBot: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user, refetch } = useGetIdentity<User>();
  const addTelegramAccountToDb = useAddTelegramAccountToDb();

  if (!user) return null;

  const handleAddTelegramAccountToDb = async (userFromTelegram: TelegramUser, user: User) => {
    await addTelegramAccountToDb(userFromTelegram, user.id);
    await refetch();
    setTimeout(() => refetch(), 500);
  };

  if (!user?.telegramAccount) {
    return (
      <>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper
              style={{ zIndex: 500, borderRadius: '10px' }}
              p="lg"
              bg="white"
              shadow="lg"
              withBorder
            >
              <Stack align="center">
                <Text>Чтобы просмотреть страницу, необходимо зарегистрироваться в боте</Text>
                {/* <Button onClick={(tgUser: TelegramUser) => handleAddTelegramAccountToDb(tgUser, user)}>
                  Зарегистрироваться
                </Button> */}
                <TelegramLoginButton
                  requestAccess={true}
                  buttonSize="large"
                  dataOnauth={(tgUser: TelegramUser) => handleAddTelegramAccountToDb(tgUser, user)}
                  botName={getConfig().TG_BOT_USERNAME}
                />
              </Stack>
            </Paper>
          </div>
          <div style={{ filter: 'blur(2.5px)', pointerEvents: 'none' }}>{children}</div>
        </div>
      </>
    );
  }

  return children;
};
