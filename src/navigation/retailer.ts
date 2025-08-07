import { IconGauge, IconUsers } from "@tabler/icons-react";

export const retailerNavItems = [
  {
    label: 'Dashboard',
    link: '/retailer',
    icon: IconGauge,
    allowedRoles: ['R'],
  },
  {
    label: 'Support Ticket',
    icon: IconUsers,
    links: [
      {
        label: 'Support Ticket List',
        link: 'support-ticket/list',
        allowedRoles: ['R'],
        // permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Support Ticket',
        link: 'support-ticket/create',
        allowedRoles: ['R'],
        // permission: 'MEMBERS_READ',
      },
    ],
  },
];
