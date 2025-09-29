import {
  IconGauge,
  IconBuildingSkyscraper,
  IconUserShield,
  IconLock,
  IconSettingsCog,
  IconUsersGroup,
  IconWallet,
  IconPackages,
  IconPresentationAnalytics,
  IconDiscount2,
  IconAdjustments,
  IconLifebuoy,
  IconPercentage,
  IconIdBadge2,
  IconReportAnalytics,
} from '@tabler/icons-react';
import { PERMISSIONS } from '../constants/permissions';

export const superAdminNavItems = [
  {
    label: 'Dashboard',
    icon: IconGauge,
    link: '/',
    allowedRoles: ['SUPER_ADMIN'],
  },
  {
    label: 'Tenants',
    icon: IconBuildingSkyscraper,
    initiallyOpened: true,
    links: [
      {
        label: 'All Tenants',
        link: '/tenants/list',
        permission: PERMISSIONS.TENANTS_READ,
        allowedRoles: ['SUPER_ADMIN'],
      },
      {
        label: 'Add Tenant',
        link: '/tenants/create',
        permission: PERMISSIONS.TENANTS_CREATE,
        allowedRoles: ['SUPER_ADMIN'],
      },
    ],
  },
  {
    label: 'WL Admins',
    icon: IconUserShield,
    links: [
      {
        label: 'All WL-Admins',
        link: '/wl-admins/list',
        permission: PERMISSIONS.WLADMIN_READ,
        allowedRoles: ['SUPER_ADMIN'],
      },
      {
        label: 'Add WL Admin',
        link: '/wl-admins/create',
        permission: PERMISSIONS.WLADMIN_CREATE,
        allowedRoles: ['SUPER_ADMIN'],
      },
    ],
  },
  {
    label: 'Permissions',
    icon: IconLock,
    links: [
      { label: 'All Permissions', link: '/permissions/list', permission: PERMISSIONS.PERMISSIONS_READ, allowedRoles: ['SUPER_ADMIN'] },
      { label: 'Add Permission', link: '/permissions/create', permission: PERMISSIONS.PERMISSIONS_CREATE, allowedRoles: ['SUPER_ADMIN'] },
    ],
  },
  {
    label: 'Roles',
    icon: IconSettingsCog,
    links: [
      { label: 'All Roles', link: '/roles/list', allowedRoles: ['SUPER_ADMIN'] },
      { label: 'Add Role', link: '/roles/create', allowedRoles: ['SUPER_ADMIN'] },
    ],
  },
  {
    label: 'Employees',
    icon: IconUsersGroup,
    links: [
      { label: 'All Employees', link: '/employees/list', allowedRoles: ['SUPER_ADMIN'] },
      { label: 'Add Employee', link: '/employees/create', allowedRoles: ['SUPER_ADMIN'] },
    ],
  },
  {
    label: 'Wallet Management',
    icon: IconWallet,
    links: [
      { label: 'Tenant List', link: '/wallet/tenant-list', allowedRoles: ['SUPER_ADMIN'] },
            { label: 'Pending Credit Request', link: '/wallet/pending-credit-requests', allowedRoles: ['SUPER_ADMIN'] },
      { label: 'Credit Request', link: '/wallet/credit-requests', allowedRoles: ['SUPER_ADMIN'] },
    ],
  },
  {
    label: 'Services',
    icon: IconPackages,
    links: [
      { label: 'Global Services', link: '/services/global', permission: PERMISSIONS.TENANTS_READ,
        allowedRoles: ['SUPER_ADMIN'], },
      { label: 'Tenant Services', link: '/services/tenant-services', permission: PERMISSIONS.TENANTS_READ,
        allowedRoles: ['SUPER_ADMIN'], },
    ],
  },
    {
    label: 'Service Actions',
    icon: IconUsersGroup,
    links: [
      { label: 'Service Actions List', link: '/service-actions', allowedRoles: ['SUPER_ADMIN'] },
      { label: 'Add Service Action', link: '/service-actions/create', allowedRoles: ['SUPER_ADMIN'] },
    ],
  },
  {
    label: 'Commission',
    icon: IconDiscount2,
    links: [
      {label: 'Service Operators', link: '/commission/service-operators', permission: PERMISSIONS.TENANTS_READ,
        allowedRoles: ['SUPER_ADMIN']
      }
    ]
  },
  {
    label: 'Logs',
    icon: IconPresentationAnalytics,
    links: [
        {
    label: 'Audit Logs',
    link: '/logs',
    permission: PERMISSIONS.TENANTS_CREATE,
    allowedRoles: ['SUPER_ADMIN'],
  },
    {
    label: 'Login Logs',
    link: '/auth-logs',
    permission: PERMISSIONS.TENANTS_CREATE,
    allowedRoles: ['SUPER_ADMIN'],
  },
    ]
  },
  {
    label: 'Settings',
    icon: IconSettingsCog,
    links: [
      {label: 'Company Banks', link: '/settings/banks', permission: PERMISSIONS.TENANTS_CREATE, allowedRoles: ['SUPER_ADMIN']},
      {label: 'Add Company Bank', link: '/settings/add-bank', permission: PERMISSIONS.TENANTS_CREATE, allowedRoles: ['SUPER_ADMIN']}
    ]
  },
        {
    label: 'Reports',
    link: 'report',
    icon: IconReportAnalytics,
    allowedRoles: ['SUPER_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
      {
    label: 'KYC Management',
    link: 'profile',
    icon: IconIdBadge2,
    allowedRoles: ['SUPER_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
     {
    label: 'API User',
    link: 'api-user',
    icon: IconPercentage,
    allowedRoles: ['SUPER_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
     {
    label: 'Support Ticket',
    link: 'support-ticket',
    icon: IconLifebuoy,
    allowedRoles: ['SUPER_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
    {
    label: 'Scope',
    link: 'scope',
    icon: IconAdjustments,
    allowedRoles: ['SUPER_ADMIN'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
];
