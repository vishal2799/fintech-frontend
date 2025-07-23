export const STATUS_OPTIONS = ['ACTIVE', 'DISABLED'] as const;
export type TenantStatus = typeof STATUS_OPTIONS[number];
