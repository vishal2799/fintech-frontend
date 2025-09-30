// ============================================
// 2. API
// src/modules/commissionTemplates/api/commissionTemplates.api.ts
// ============================================

import axiosInstance from '../../../api/axios';
import { type CreateCommissionTemplateInput, type UpdateCommissionTemplateInput } from "../schema/commissionTemplate.schema";

export const commissionTemplatesApi = {
  getAll: () => 
    axiosInstance.get("/commission-templates"),

  getAll2: (params?: { isActive?: boolean; search?: string; page?: number; limit?: number }) => 
    axiosInstance.get("/commission-templates", { params }),
  
  getById: (id: string) => 
    axiosInstance.get(`/commission-templates/${id}`),
  
  create: (data: CreateCommissionTemplateInput) => 
    axiosInstance.post("/commission-templates", data),
  
  update: (id: string, data: UpdateCommissionTemplateInput) => 
    axiosInstance.patch(`/commission-templates/${id}`, data),
  
  delete: (id: string) => 
    axiosInstance.delete(`/commission-templates/${id}`),
};

