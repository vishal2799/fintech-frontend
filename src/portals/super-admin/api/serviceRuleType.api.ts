// src/portals/superadmin/api/serviceRuleType.api.ts
import axiosInstance from '../../../api/axios';
import {
  type CreateServiceRuleTypeInput,
  type UpdateServiceRuleTypeInput,
} from '../schema/serviceRuleType.schema';
import { type ServiceRuleType, type ServiceSummary } from '../types/serviceRuleType.types';

const BASE_URL = '/service-rule-types';

export const getServiceRuleTypesAPI = async (): Promise<ServiceRuleType[]> => {
  const { data } = await axiosInstance.get(BASE_URL);
  return data.data;
};

export const getServicesSummaryAPI = async (): Promise<ServiceSummary[]> => {
  // Adjust the URL/params if your backend differs
  const { data } = await axiosInstance.get('/services', {
    params: { fields: 'id,code,name' },
  });
  return data.data as ServiceSummary[];
};

export const createServiceRuleTypeAPI = async (
  payload: CreateServiceRuleTypeInput
): Promise<ServiceRuleType> => {
  const { data } = await axiosInstance.post(BASE_URL, payload);
  return data.data;
};

export const updateServiceRuleTypeAPI = async (
  id: string,
  payload: UpdateServiceRuleTypeInput
): Promise<ServiceRuleType> => {
  const { data } = await axiosInstance.put(`${BASE_URL}/${id}`, payload);
  return data.data;
};

export const deleteServiceRuleTypeAPI = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`);
};
