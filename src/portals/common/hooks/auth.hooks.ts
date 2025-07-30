import { useMutation } from '@tanstack/react-query';
import * as api from '../api/auth.api';
import type { LoginInput, OtpLoginInput } from '../schema/auth.schema';

export const useLogin = () =>
  useMutation({
    mutationFn: (data: LoginInput) => api.login(data),
  });

export const useVerifyOtpLogin = () =>
  useMutation({
    mutationFn: (data: OtpLoginInput) => api.verifyOtpLogin(data),
  });
