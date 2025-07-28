import { useMutation } from '@tanstack/react-query';
import * as api from '../api/otp.api';
import type { SendOtpInput, VerifyOtpInput } from '../schema/otp.schema';

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (data: SendOtpInput) => api.sendOtp(data),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpInput) => api.verifyOtp(data),
  });
};
