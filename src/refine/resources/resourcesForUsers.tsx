import { ResourceProps } from '@refinedev/core';
import {
  IconCandy,
  IconEraser,
  IconLetterA,
  IconMailFast,
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
    icon: <IconMailFast />,
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
    icon: <IconLetterA />,
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
    icon: <IconEraser />,
    name: 'stopwords',
    list: '/stopwords',
    create: '/stopwords/create',
    edit: '/stopwords/edit/:id',
    show: '/stopwords/show/:id',
    meta: {
      canDelete: true,
    },
  },
  // {
  //   icon: <IconUsers />,
  //   name: 'leads',
  //   list: '/leads',
  //   create: '/leads/create',
  //   edit: '/leads/edit/:id',
  //   show: '/leads/show/:id',
  //   meta: {
  //     canDelete: true,
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
      icon: <IconCandy />,
    },
  },
];
