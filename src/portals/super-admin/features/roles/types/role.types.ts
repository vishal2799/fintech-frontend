import type { Permission } from '../../permissions/types/permissions.types';

export interface Role {
  id: string;
  name: string;
  description?: string;
  scope: 'PLATFORM' | 'TENANT';
  tenantId: string;
  permissions: Permission[];
}

export interface RoleFormValues {
  name: string;
  description?: string;
  scope: 'PLATFORM' | 'TENANT';
  permissionIds: string[];
}