import {
  IconGauge,
  IconUsers,
  IconUsersGroup,
  IconUserPlus,
  IconWallet,
  IconReportAnalytics,
  IconIdBadge2,
  IconLifebuoy,
  IconAdjustments,
} from "@tabler/icons-react";

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
        icon: IconUsersGroup,
      },
      {
        label: 'Create Distributor',
        link: 'distributors/create',
        allowedRoles: ['SD'],
        permission: 'MEMBERS_READ',
        icon: IconUserPlus,
      },
      {
        label: 'Retailers List',
        link: 'retailers/list',
        allowedRoles: ['SD'],
        permission: 'MEMBERS_READ',
        icon: IconUsersGroup,
      },
      {
        label: 'Create Retailer',
        link: 'retailers/create',
        allowedRoles: ['SD'],
        permission: 'MEMBERS_READ',
        icon: IconUserPlus,
      },
    ],
  },
  {
    label: 'Wallet Management',
    link: 'wallet',
    icon: IconWallet,
    allowedRoles: ['SD'],
  }, 
  {
    label: 'Reports',
    link: 'report',
    icon: IconReportAnalytics,
    allowedRoles: ['SD'],
  },
  {
    label: 'Profile KYC',
    link: 'profile',
    icon: IconIdBadge2,
    allowedRoles: ['SD'],
  },
  {
    label: 'Support Ticket',
    link: 'support-ticket',
    icon: IconLifebuoy,
    allowedRoles: ['SD'],
  },
  {
    label: 'Scope',
    link: 'scope',
    icon: IconAdjustments,
    allowedRoles: ['SD'],
  },
];

