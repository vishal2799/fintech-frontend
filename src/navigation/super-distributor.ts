import { IconGauge, IconUsers } from "@tabler/icons-react";

export const sdNavItems = [
  {
    label: 'Dashboard',
    link: '/super-distributor',
    icon: IconGauge,
    allowedRoles: ['SD'],
  },
    {
    label: 'Members',
    icon: IconUsers,
    links: [
      {
        label: 'Distributors List',
        link: 'distributors/list',
        allowedRoles: ['SD'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Distributor',
        link: 'distributors/create',
        allowedRoles: ['SD'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Retailers List',
        link: 'retailers/list',
        allowedRoles: ['SD'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Retailer',
        link: 'retailers/create',
        allowedRoles: ['SD'],
        permission: 'MEMBERS_READ',
      },
    ],
  },
  {
    label: 'Support Ticket',
    icon: IconUsers,
    links: [
      {
        label: 'Support Ticket List',
        link: 'support-ticket/list',
        allowedRoles: ['SD'],
        // permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Support Ticket',
        link: 'support-ticket/create',
        allowedRoles: ['SD'],
        // permission: 'MEMBERS_READ',
      },
    ],
  },
];
