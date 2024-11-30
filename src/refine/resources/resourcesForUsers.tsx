import { ResourceProps } from '@refinedev/core';
import {
  IconCoins,
  IconFishHook,
  IconFishHookOff,
  IconRipple,
  IconRippleOff,
  IconUser,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons';

export const resourcesForUsers: ResourceProps[] = [
  {
    icon: <IconUserCircle />,
    name: 'accounts',
    list: '/accounts',
    create: '/accounts/create',
    edit: '/accounts/edit/:id',
    show: '/accounts/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    icon: <IconRipple />,
    name: 'groups',
    list: '/groups',
    create: '/groups/create',
    edit: '/groups/edit/:id',
    show: '/groups/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    icon: <IconRippleOff />,
    name: 'groups/archived',
    list: '/groups/archived',
    show: '/groups/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    icon: <IconFishHook />,
    name: 'keywords',
    list: '/keywords',
    create: '/keywords/create',
    edit: '/keywords/edit/:id',
    show: '/keywords/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    icon: <IconFishHookOff />,
    name: 'stopwords',
    list: '/stopwords',
    create: '/stopwords/create',
    edit: '/stopwords/edit/:id',
    show: '/stopwords/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    icon: <IconUsers />,
    name: 'leads',
    list: '/leads',
    create: '/leads/create',
    edit: '/leads/edit/:id',
    show: '/leads/show/:id',
    meta: {
      canDelete: true,
    },
  },
  // {
  //   name: 'Аналитика',
  //   list: '/analytics',
  //   meta: {
  //     label: 'Аналитика',
  //     icon: <IconChartBar />,
  //   },
  // },
  {
    name: 'Профиль',
    list: '/profile',
    meta: {
      label: 'Профиль',
      icon: <IconUser />,
    },
  },
  {
    name: 'Подписка',
    list: '/pricing',
    meta: {
      label: 'Подписка',
      icon: <IconCoins />,
    },
  },
];
