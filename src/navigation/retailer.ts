import {
  IconGauge,           // Dashboard
  IconUser,            // Profile
  IconWallet,          // Wallet Management
  IconArrowsLeftRight, // Transactions
  IconPercentage,      // Commissions
  IconBell,            // Notifications
  IconLifebuoy         // Support Ticket
} from "@tabler/icons-react";
import { PERMISSIONS } from "../constants/permissions";

export const retailerNavItems = [
  {
    label: 'Dashboard',
    link: '/retailer',
    icon: IconGauge,
    allowedRoles: ['R'],
  },
  {
    label: 'Profile',
    link: 'profile',
    icon: IconUser,
    allowedRoles: ['R'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
  {
    label: 'Wallet Management',
    link: 'wallet',
    icon: IconWallet,
    allowedRoles: ['R'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
  {
    label: 'Transactions',
    link: 'transactions',
    icon: IconArrowsLeftRight,
    allowedRoles: ['R'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
  {
    label: 'Commissions',
    link: 'commissions',
    icon: IconPercentage,
    allowedRoles: ['R'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
  {
    label: 'Notifications',
    link: 'notifications',
    icon: IconBell,
    allowedRoles: ['R'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
  {
    label: 'Support Ticket',
    link: 'support-ticket',
    icon: IconLifebuoy,
    allowedRoles: ['R'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
  {
    label: 'Scope',
    link: 'scope',
    icon: IconLifebuoy,
    allowedRoles: ['R'],
    permission: PERMISSIONS.TENANTS_CREATE,
  },
];

