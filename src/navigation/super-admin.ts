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
    label: 'Audit Logs',
    icon: IconPresentationAnalytics,
    link: '/logs',
    permission: PERMISSIONS.TENANTS_CREATE,
    allowedRoles: ['SUPER_ADMIN'],
  },
];
