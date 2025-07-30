
export type User = {
  id: string;
  tenantId: string;
  parentId?: string | null;
  name: string;
  email: string;
  mobile: string;
  status: 'ACTIVE' | 'BLOCKED' | 'LOCKED';
  isVerified: boolean;
  loginAttempts: number;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserInput = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  status?: 'ACTIVE' | 'BLOCKED' | 'LOCKED';
};
