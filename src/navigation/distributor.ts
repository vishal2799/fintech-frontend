import { IconAdjustments, IconGauge, IconIdBadge2, IconLifebuoy, IconReportAnalytics, IconUsers, IconWallet } from "@tabler/icons-react";

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
    {
    label: 'Wallet Management',
    link: 'wallet',
    icon: IconWallet,
    allowedRoles: ['D'],
  }, 
  {
    label: 'Reports',
    link: 'report',
    icon: IconReportAnalytics,
    allowedRoles: ['D'],
  },
  {
    label: 'Profile KYC',
    link: 'profile',
    icon: IconIdBadge2,
    allowedRoles: ['D'],
  },
  {
    label: 'Support Ticket',
    link: 'support-ticket',
    icon: IconLifebuoy,
    allowedRoles: ['D'],
  },
  {
    label: 'Scope',
    link: 'scope',
    icon: IconAdjustments,
    allowedRoles: ['D'],
  },
];
