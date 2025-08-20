export interface ServiceCommission {
  id: string;
  serviceId: string;
  operatorId?: string; // optional for generic services
  serviceName: string;
  operatorName: string;
  level: 'TENANT' | 'SUPER_DISTRIBUTOR' | 'DISTRIBUTOR' | 'RETAILER';
  value: number;
  valueType: 'PERCENTAGE' | 'FIXED';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}