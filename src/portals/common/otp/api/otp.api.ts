import axios from '../../../../api/axios';
import type { SendOtpInput, VerifyOtpInput } from '../schema/otp.schema';

export const sendOtp = async (data: SendOtpInput) => {
  const res = await axios.post('/otp/send', data);
  return res.data;
};

export const verifyOtp = async (data: VerifyOtpInput) => {
  const res = await axios.post('/otp/verify', data);
  return res.data;
};
