// ============================================
// 2. API
// src/modules/serviceActions/api/serviceActions.api.ts
// ============================================

import axiosInstance from '../../../api/axios';
import { type ServiceAction, type CreateServiceActionInput, type UpdateServiceActionInput } from "../schema/serviceAction.schema";

export const serviceActionsApi = {
  getAll: () => 
    axiosInstance.get("/service-actions"),

  getAll2: (params?: { isActive?: boolean; search?: string; page?: number; limit?: number }) => 
    axiosInstance.get("/service-actions", { params }),
  
  getById: (id: string) => 
    axiosInstance.get(`/service-actions/${id}`),
  
  getByCode: (code: string) => 
    axiosInstance.get(`/service-actions/code/${code}`),
  
  create: (data: CreateServiceActionInput) => 
    axiosInstance.post<ServiceAction>("/service-actions", data),
  
  update: (id: string, data: UpdateServiceActionInput) => 
    axiosInstance.patch<ServiceAction>(`/service-actions/${id}`, data),
  
  delete: (id: string) => 
    axiosInstance.delete(`/service-actions/${id}`),
};
