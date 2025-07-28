export interface OtpPayload {
  identifier: string;
  useCase: 'LOGIN' | 'SIGNUP' | 'FORGOT_PASSWORD' | 'VERIFY_CONTACT';
  otp?: string;
}
