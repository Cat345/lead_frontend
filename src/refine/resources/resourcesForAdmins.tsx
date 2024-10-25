import { ResourceProps } from '@refinedev/core';
import { IconRobot, IconUsers } from '@tabler/icons';

export const resourcesForAdmins: ResourceProps[] = [
  {
    icon: <IconRobot />,
    name: 'bots',
    list: '/bots',
  },
  {
    icon: <IconUsers />,
    name: 'users',
    list: '/users',
    create: '/users/create',
    edit: '/users/edit/:id',
    show: '/users/show/:id',
    meta: {
      canDelete: true,
    },
  },
];
