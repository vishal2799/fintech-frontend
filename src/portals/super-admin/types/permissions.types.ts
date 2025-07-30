export interface Permission {
  id: string;
  name: string;
  module: string;
  description?: string;
  scope: 'PLATFORM' | 'TENANT' | 'BOTH';
  createdAt?: string;
}
