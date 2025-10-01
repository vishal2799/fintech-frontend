// ============================================
// 2. API
// src/modules/serviceTemplates/api/serviceTemplates.api.ts
// ============================================

import axiosInstance from '../../../api/axios';
import { type CreateServiceTemplateInput, type UpdateServiceTemplateInput } from "../schema/serviceTemplate.schema";

export const serviceTemplatesApi = {
  getAll: () => 
    axiosInstance.get("/service-templates"),

  getDefault: () => 
    axiosInstance.get("/service-templates/default"),
  
  getAll2: (params?: { serviceActionId?: string; templateId?: string; isActive?: boolean; page?: number; limit?: number }) => 
    axiosInstance.get("/service-templates", { params }),

  getById: (id: string) => 
    axiosInstance.get(`/service-templates/${id}`),
  
  getByServiceAction: (serviceActionId: string) => 
    axiosInstance.get(`/service-templates/service-action/${serviceActionId}`),
  
  create: (data: CreateServiceTemplateInput) => 
    axiosInstance.post("/service-templates", data),
  
  update: (id: string, data: UpdateServiceTemplateInput) => 
    axiosInstance.patch(`/service-templates/${id}`, data),
  
  delete: (id: string) => 
    axiosInstance.delete(`/service-templates/${id}`),
};
