import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createServiceOperator,
  getServiceOperators,
  getServiceOperatorById,
  updateServiceOperator,
  deleteServiceOperator,
} from "../api/serviceOperator.api";
import type {
  CreateServiceOperatorInput,
  UpdateServiceOperatorInput,
} from "../schema/serviceOperator.schema";

export const useServiceOperators = (serviceId?: string) => {
  return useQuery({
    queryKey: ["serviceOperators", serviceId],
    queryFn: () => getServiceOperators(serviceId),
  });
};

export const useServiceOperator = (id: string) => {
  return useQuery({
    queryKey: ["serviceOperator", id],
    queryFn: () => getServiceOperatorById(id),
    enabled: !!id,
  });
};

export const useCreateServiceOperator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServiceOperatorInput) => createServiceOperator(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceOperators"] });
    },
  });
};

export const useUpdateServiceOperator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, payload}: {id: string; payload: UpdateServiceOperatorInput}) => updateServiceOperator(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["serviceOperators"] });
      queryClient.invalidateQueries({ queryKey: ["serviceOperator", variables.id] });
    },
  });
};

export const useDeleteServiceOperator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteServiceOperator(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceOperators"] });
    },
  });
};
