import { IconGauge, IconPackages, IconSettingsCog, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { PERMISSIONS } from "../constants/permissions";

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
    label: 'Roles',
    icon: IconSettingsCog,
    links: [
      { label: 'All Roles', link: 'roles/list', allowedRoles: ['WL_ADMIN'] },
      { label: 'Add Role', link: 'roles/create', allowedRoles: ['WL_ADMIN'] },
    ],
  },
    {
    label: 'Employees',
    icon: IconUsersGroup,
    links: [
      { label: 'All Employees', link: 'employees/list', allowedRoles: ['WL_ADMIN'] },
      { label: 'Add Employee', link: 'employees/create', allowedRoles: ['WL_ADMIN'] },
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
  },
  {
      label: 'Settings',
      icon: IconSettingsCog,
      links: [
        {label: 'Company Banks', link: 'settings/banks', permission: PERMISSIONS.TENANTS_CREATE, allowedRoles: ['WL_ADMIN']},
        {label: 'Add Company Bank', link: 'settings/add-bank', permission: PERMISSIONS.TENANTS_CREATE, allowedRoles: ['WL_ADMIN']}
      ]
    }
];
