import axios from '../../../api/axios';
import type { LoginInput, OtpLoginInput } from '../schema/auth.schema';

export const login = (data: LoginInput) =>
  axios.post('/auth/login', data);

export const verifyOtpLogin = (data: OtpLoginInput) =>
  axios.post('/auth/verify-otp', data).then(res => res.data);

export const logoutAPI = () => axios.post('/auth/logout');
