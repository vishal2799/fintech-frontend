import {
  IconGauge,
  IconLifebuoy,
  IconPackages,
  IconSettingsCog,
  IconUsers,
  IconUsersGroup,
  IconWallet,
  IconListDetails,
  IconReportAnalytics,
  IconIdBadge2,
  IconPercentage,
  IconAdjustments,
  IconMoneybag,
  IconDiscount2,
} from "@tabler/icons-react";
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
    label: 'Wallet Management',
    icon: IconWallet,
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
    label: 'Internal Wallet',
    icon: IconMoneybag,
    links: [
      {
        label: 'User List',
        link: 'internal-wallet/user-list',
        allowedRoles: ['WL_ADMIN']
      },
      {
        label: 'Credit requests',
        link: 'internal-wallet/credit-requests',
        allowedRoles: ['WL_ADMIN']
      },
      { 
        label: 'Pending Credit Request', 
        link: 'internal-wallet/pending-credit-requests', allowedRoles: ['WL_ADMIN'] },
    ]
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
    label: 'Commission',
    icon: IconDiscount2,
    links: [
      { label: 'Templates List', link: 'commission-templates/list', allowedRoles: ['WL_ADMIN'] },
      // { label: 'Add Commission Templates', link: '/commission-templates/create', allowedRoles: ['SUPER_ADMIN'] },
    ],
  },
  {
      label: 'Settings',
      icon: IconSettingsCog,
      links: [
        {label: 'Company Banks', link: 'settings/banks', permission: PERMISSIONS.TENANTS_CREATE, allowedRoles: ['WL_ADMIN']},
        {label: 'Add Company Bank', link: 'settings/add-bank', permission: PERMISSIONS.TENANTS_CREATE, allowedRoles: ['WL_ADMIN']}
      ]
    },
        {
    label: 'Logs',
    link: 'logs',
    icon: IconListDetails,
    allowedRoles: ['WL_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
      {
    label: 'Reports',
    link: 'report',
    icon: IconReportAnalytics,
    allowedRoles: ['WL_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
      {
    label: 'KYC Management',
    link: 'profile',
    icon: IconIdBadge2,
    allowedRoles: ['WL_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
     {
    label: 'Commissions',
    link: 'commissions',
    icon: IconPercentage,
    allowedRoles: ['WL_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
     {
    label: 'Support Ticket',
    link: 'support-ticket',
    icon: IconLifebuoy,
    allowedRoles: ['WL_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
    {
    label: 'Scope',
    link: 'scope',
    icon: IconAdjustments,
    allowedRoles: ['WL_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
];
