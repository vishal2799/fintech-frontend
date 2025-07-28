import {
  Button,
  Container,
  Paper,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../../../stores/useAuthStore';
import { useVerifyOtpLogin } from '../api/auth.hooks';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('otpEmail');
  const verifyOtp = useVerifyOtpLogin();
  const { login } = useAuthStore();

  const form = useForm({
    initialValues: {
      otp: '',
    },
    validate: {
      otp: (value) => (value.length !== 6 ? 'Enter a valid 6-digit OTP' : null),
    },
  });

  const handleSubmit = form.onSubmit(async ({ otp }) => {
    if (!email) {
      notifications.show({ message: 'Missing login email. Please login again.', color: 'red' });
      return navigate('/login');
    }

    try {
      const res = await verifyOtp.mutateAsync({ identifier: email, otp });

      const accessToken = res?.data?.accessToken;
      const refreshToken = res?.data?.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error('Invalid token response');
      }

      login({ accessToken, refreshToken });
      notifications.show({ message: 'Login successful', color: 'green' });

      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const staticRole = payload.staticRole;

      switch (staticRole) {
        case 'SUPER_ADMIN':
          navigate('/super-admin');
          break;
        case 'WL_ADMIN':
          navigate('/wl-admin');
          break;
        case 'EMPLOYEE':
        case 'D':
        case 'R':
        case 'SD':
          navigate('/dashboard');
          break;
        default:
          navigate('/unauthorized');
      }
    } catch (err: any) {
      notifications.show({
        message: err?.response?.data?.message || 'OTP verification failed',
        color: 'red',
      });
    }
  });

  return (
    <Container size="xs" my={40}>
      <Title ta="center">Enter OTP</Title>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="OTP"
            withAsterisk
            placeholder="6-digit code"
            {...form.getInputProps('otp')}
          />
          <Button
            type="submit"
            fullWidth
            mt="md"
            loading={verifyOtp.isPending}
          >
            Verify OTP
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
