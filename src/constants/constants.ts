import type { WLAdminStatus } from "../portals/super-admin/features/wl-admins/types/wl-admin.types";

export const WL_ADMIN_STATUSES: WLAdminStatus[] = ['ACTIVE', 'LOCKED', 'BLOCKED'];

export const statusColorMap: Record<WLAdminStatus, string> = {
  ACTIVE: 'green',
  LOCKED: 'gray',
  BLOCKED: 'orange',
};
