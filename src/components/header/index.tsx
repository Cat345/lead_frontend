import {
  ActionIcon,
  Flex,
  Group,
  Header as MantineHeader,
  Sx,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useGetIdentity } from '@refinedev/core';
import { RefineThemedLayoutV2HeaderProps } from '@refinedev/mantine';
import { IconMoonStars, IconSun } from '@tabler/icons';
import React from 'react';

import { User } from '../../models/User';
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu';

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky }) => {
  const { data: user } = useGetIdentity<User>();
  const remainingDays = user?.remainingSubscribeDays;

  const remainingDaysString =
    remainingDays && remainingDays > 0
      ? new Intl.RelativeTimeFormat('ru', {
          style: 'long',
          numeric: 'auto',
        }).format(remainingDays, 'days')
      : null;

  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const borderColor = dark ? theme.colors.dark[6] : theme.colors.gray[2];

  let stickyStyles: Sx = {};
  if (sticky) {
    stickyStyles = {
      position: `sticky`,
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <MantineHeader
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        zIndex: 400,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          height: '100%',
        }}
      >
        <HamburgerMenu />
        <Group id="subscribe-expiring">
          {remainingDaysString ? (
            <Text>Подписка закончится {remainingDaysString}</Text>
          ) : (
            <Text>Подписка не активна</Text>
          )}
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'primary'}
            onClick={() => toggleColorScheme()}
            title="Изменить тему"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Flex>
    </MantineHeader>
  );
};
