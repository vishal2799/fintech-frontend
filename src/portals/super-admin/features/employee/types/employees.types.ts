import type { Role } from '../../roles/types/role.types';

export interface Employee {
  id: string;
  name: string;
  email: string;
  mobile: string;
  staticRole: 'EMPLOYEE';
  tenantId: string;
  isEmployee: true;
  roleId?: string;
  role?: Role;
}
