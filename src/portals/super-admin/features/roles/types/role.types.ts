export type RoleScope = 'TENANT' | 'PLATFORM';

export interface Role {
  id: string;
  name: string;
  description?: string | null;
  scope: RoleScope;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleWithPermissions extends Role {
  permissionIds: string[];
}
