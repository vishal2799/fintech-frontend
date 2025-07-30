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
];

export const STATUS_OPTIONS = ['ACTIVE', 'DISABLED'] as const;
export type TenantStatus = typeof STATUS_OPTIONS[number];
