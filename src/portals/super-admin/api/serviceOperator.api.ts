import axios from '../../../api/axios';
import type {
  CreateServiceOperatorInput,
  UpdateServiceOperatorInput,
} from "../schema/serviceOperator.schema";
import { type ServiceOperator } from "../types/serviceOperator.types";

const BASE_URL = "/service-operators";

export const createServiceOperator = async (data: CreateServiceOperatorInput) => {
  return axios.post<ServiceOperator>(BASE_URL, data).then((res) => res.data);
};

export const getServiceOperators = async (serviceId?: string) => {
  return axios
    .get<ServiceOperator[]>(BASE_URL, { params: { serviceId } })
    .then((res) => res.data.data);
};

export const getServiceOperatorById = async (id: string) => {
  return axios.get<ServiceOperator>(`${BASE_URL}/${id}`).then((res) => res.data);
};

export const updateServiceOperator = async (id: string, data: UpdateServiceOperatorInput) => {
  return axios.put<ServiceOperator>(`${BASE_URL}/${id}`, data).then((res) => res.data);
};

export const deleteServiceOperator = async (id: string) => {
  return axios.delete<{ message: string }>(`${BASE_URL}/${id}`).then((res) => res.data);
};
