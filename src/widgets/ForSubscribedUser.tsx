import { Button, Paper, Stack, Text } from '@mantine/core';
import { useGetIdentity } from '@refinedev/core';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../models/User';

export const ForSubscribedUser: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user } = useGetIdentity<User>();

  if (!user) return null;

  if (user.remainingSubscribeDays <= 0) {
    return (
      <>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '150px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper style={{ zIndex: 500, borderRadius: '10px' }} p="lg" shadow="lg" withBorder>
              <Stack align="center">
                <Text>Чтобы просмотреть страницу, необходимо продлить подписку</Text>
                {/* <Button onClick={(tgUser: TelegramUser) => handleAddTelegramAccountToDb(tgUser, user)}>
                  Зарегистрироваться
                </Button> */}
                <Button component={Link} to="/pricing">
                  Продлить подписку
                </Button>
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
