// ✅ WL Admins API – src/api/wl-admins.api.ts

import API from "../../../../../api/axios";

export interface CreateWLAdminDto {
  name: string;
  email: string;
  mobile: string;
  password: string;
  tenantId: string;
}

export interface UpdateWLAdminDto {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
  status?: string;
}

const baseURL = '/super-admin/wl-admin';

export const getWLAdmins = async (tenantId?: string) => {
  const { data } = await API.get(baseURL, {
    params: { tenantId },
  });
  return data.data;
};

export const getWLAdminById = async (id: string) => {
  const { data } = await API.get(`${baseURL}/${id}`);
  return data;
};

export const createWLAdmin = async (payload: CreateWLAdminDto) => {
  const { data } = await API.post(baseURL, payload);
  return data;
};

export const updateWLAdmin = async (id: string, payload: UpdateWLAdminDto) => {
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
