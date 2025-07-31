import { IconGauge, IconPackages, IconUsers } from "@tabler/icons-react";

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
        label: 'Super Distributors List',
        link: 'super-distributors/list',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Super Distributor',
        link: 'super-distributors/create',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Distributors List',
        link: 'distributors/list',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Distributor',
        link: 'distributors/create',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Retailers List',
        link: 'retailers/list',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Create Retailer',
        link: 'retailers/create',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
    ],
  },
  {
    label: 'Wallet',
    icon: IconUsers,
    links: [
      {
        label: 'Ledger',
        link: 'wallet/ledger',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Add Fund',
        link: 'wallet/add-fund',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
      {
        label: 'Credit Requests',
        link: 'wallet/credit-requests',
        allowedRoles: ['WL_ADMIN'],
        permission: 'MEMBERS_READ',
      },
    ],
  },
  {
    label: 'Services',
    icon: IconPackages,
    links: [
      {
        label: 'Portal Services',
        link: 'services/portal-services',
        allowedRoles: ['WL_ADMIN']
      }
    ]
  }
];
