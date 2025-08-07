import { IconGauge, IconUsers } from "@tabler/icons-react";

export const distributorNavItems = [
  {
    label: 'Dashboard',
    link: '/distributor',
    icon: IconGauge,
    allowedRoles: ['D'],
  },
  {
    label: 'Support Ticket',
    icon: IconUsers,
    links: [
      {
        label: 'Support Ticket List',
        link: 'support-ticket/list',
        allowedRoles: ['D'],
        // permission: 'MEMBERS_READ',
      },
    ],
  },
];
