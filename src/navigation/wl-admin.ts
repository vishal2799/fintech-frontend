import { IconGauge, IconUsers } from "@tabler/icons-react";

export const wlAdminNavItems = [
  {
    label: 'Dashboard',
    link: '/admin',
    icon: IconGauge,
    allowedRoles: ['WL_ADMIN'],
  },
  {
    label: 'Members',
    icon: IconUsers,
    links: [
      {
        label: 'Retailers',
        link: '/retailers/list',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
    ],
  },
];
