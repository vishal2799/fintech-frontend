import { IconGauge, IconUsers } from "@tabler/icons-react";

export const distributorNavItems = [
  {
    label: 'Dashboard',
    link: '/distributor',
    icon: IconGauge,
    allowedRoles: ['D'],
  },
     {
    label: 'Members',
    icon: IconUsers,
    links: [
      {
        label: 'Retailers List',
        link: 'retailers/list',
        allowedRoles: ['D'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Retailer',
        link: 'retailers/create',
        allowedRoles: ['D'],
        permission: 'MEMBERS_READ',
      },
    ],
  },
];
