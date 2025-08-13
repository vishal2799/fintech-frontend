import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsApi } from "../api/bankAccounts.api";
import type { CreateBankAccountInput, UpdateBankAccountInput } from "../schema/bankAccount.schema";

export const useBankAccounts = () => {
  return useQuery({
    queryKey: ["bankAccounts"],
    queryFn: () => bankAccountsApi.getAll().then(res => res.data.data),
  });
};

export const useCreateBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBankAccountInput) => bankAccountsApi.create(data).then(res => res.data),
    onSuccess: () => {
      // notifications.show({ title: "Success", message: "Bank account added successfully", color: "green" });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
    },
  });
};

export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBankAccountInput }) =>
      bankAccountsApi.update(id, data).then(res => res.data),
    onSuccess: () => {
      // notifications.show({ title: "Success", message: "Bank account updated successfully", color: "green" });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
    },
  });
};

export const useDeleteBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bankAccountsApi.delete(id).then(res => res.data),
    onSuccess: () => {
      // notifications.show({ title: "Deleted", message: "Bank account removed", color: "red" });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
    },
  });
};
