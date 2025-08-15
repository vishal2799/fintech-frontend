import axiosInstance from '../../../api/axios';
import { type BankAccount, type CreateBankAccountInput, type UpdateBankAccountInput } from "../schema/bankAccount.schema";

export const bankAccountsApi = {
    getAll: () => axiosInstance.get("/banks"),
  // getAll: () => axiosInstance.get<BankAccount[]>("/banks"),
  getById: (id: string) => axiosInstance.get<BankAccount>(`/banks/${id}`),
  create: (data: CreateBankAccountInput) => axiosInstance.post<BankAccount>("/banks", data),
  update: (id: string, data: UpdateBankAccountInput) => axiosInstance.put<BankAccount>(`/banks/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/banks/${id}`),
};
