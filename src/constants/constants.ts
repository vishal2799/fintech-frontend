import type { WLAdminStatus } from "../portals/super-admin/types/wl-admin.types";

export const WL_ADMIN_STATUSES: WLAdminStatus[] = ['ACTIVE', 'LOCKED', 'BLOCKED'];

export const statusColorMap: Record<WLAdminStatus, string> = {
  ACTIVE: 'green',
  LOCKED: 'gray',
  BLOCKED: 'orange',
};

export const THEME_COLORS = [
  '#1D4ED8', // Blue
  '#059669', // Green
  '#F97316', // Orange
  '#DC2626', // Red
  '#7C3AED', // Violet
  '#0D9488', // Teal
  '#9333EA', // Purple
  '#E11D48', // Rose
  '#3B82F6', // Sky
  '#10B981', // Emerald
  '#00B5FF', // Light Blue
  '#099CFF', // Sky Blue
  '#63687C', // Blue Gray
  '#5D4037', // Brown
  '#4C5897', // Pale Indigo
  '#5474B4', // Pale Blue
  '#504C97', // Pale Purple
];

export const STATUS_OPTIONS = ['ACTIVE', 'DISABLED'] as const;
export type TenantStatus = typeof STATUS_OPTIONS[number];


// constants/roles.ts

export const StaticRoles = {
  R: 'R',
  SD: 'SD',
  D: 'D',
  WL_ADMIN: 'WL_ADMIN',
} as const;

export const RolePaths: { role: string; path: string }[] = [
  { role: StaticRoles.R, path: '/retailer' },
  { role: StaticRoles.SD, path: '/sub-distributor' },
  { role: StaticRoles.D, path: '/distributor' },
  { role: StaticRoles.WL_ADMIN, path: '/admin' },
];
