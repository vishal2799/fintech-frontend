import API from '../../../api/axios';
import type {
  CreateWLAdminInput,
  UpdateWLAdminInput,
} from '../schema/wl-admins.schema';

const baseURL = '/super-admin/wl-admin';

export const getWLAdmins = async (tenantId?: string) => {
  const { data } = await API.get(baseURL, {
    params: { tenantId },
  });
  return data.data;
};

export const getWLAdminById = async (id: string) => {
  const { data } = await API.get(`${baseURL}/${id}`);
  return data.data;
};

export const createWLAdmin = async (payload: CreateWLAdminInput) => {
  const { data } = await API.post(baseURL, payload);
  return data;
};

export const updateWLAdmin = async (id: string, payload: UpdateWLAdminInput) => {
  const { data } = await API.patch(`${baseURL}/${id}`, payload);
  return data;
};

export const updateWLAdminStatus = async (id: string, status: string) => {
  const { data } = await API.patch(`${baseURL}/${id}/status`, { status });
  return data;
};

export const deleteWLAdmin = async (id: string) => {
  const { data } = await API.delete(`${baseURL}/${id}`);
  return data;
};
