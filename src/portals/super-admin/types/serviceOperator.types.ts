export interface ServiceOperator {
  id: string;
  serviceId: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
