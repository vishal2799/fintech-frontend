import {
  Button,
  Container,
  Paper,
  TextInput,
  Title,
  Group,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import axios from '../../../api/axios';

import { otpLoginSchema as verifyOtpSchema, type OtpLoginInput as VerifyOtpInput } from '../schema/auth.schema';
import { useAuthStore } from '../../../stores/useAuthStore';
import { usePortal } from '../../../context/PortalContext';

export default function VerifyOtp() {
       const { portalPath } = usePortal();
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const form = useForm<VerifyOtpInput>({
    initialValues: {
      identifier: sessionStorage.getItem('otpEmail') || '',
      otp: '',
    },
    validate: zod4Resolver(verifyOtpSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: VerifyOtpInput) => {
      // Ask for location before sending request
      const location = JSON.parse(sessionStorage.getItem('userLocation') || '{}');

if (!location.latitude || !location.longitude) {
  throw new Error('Location is missing. Please log in again.');
}


      const payload = {
        ...values,
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy
      };

      const res = await axios.post('/auth/verify-otp', payload);
      return res.data;
    },
    onSuccess: (res) => {
      const accessToken = res?.data?.accessToken;
      const refreshToken = res?.data?.refreshToken;

      login({ accessToken, refreshToken });
      // const payload = JSON.parse(atob(accessToken.split('.')[1]));
      // const staticRole = payload.staticRole;
      notifications.show({ message: 'Login successful', color: 'green' });
      navigate(`${portalPath}/`);
    },
    onError: (err: any) => {
      notifications.show({
        message: err?.response?.data?.message || 'OTP verification failed',
        color: 'red',
      });
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    mutation.mutate(values);
  });

  return (
        <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <Container size="md" maw={460} w="100%">
        <Title order={2} ta="center" mb="md">
          Verify OTP
        </Title>

        <Paper withBorder shadow="sm" p={24} radius="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              withAsterisk
              disabled
              {...form.getInputProps('identifier')}
            />
            <TextInput
              label="OTP"
              withAsterisk
              mt="md"
              placeholder="Enter the 6-digit OTP"
              {...form.getInputProps('otp')}
            />

            <Group justify="flex-end" mt="xl">
              <Button type="submit" loading={mutation.isPending}>
                Verify OTP
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}


// import {
//   Button,
//   Container,
//   Paper,
//   TextInput,
//   Title,
// } from '@mantine/core';
// import { useForm } from '@mantine/form';
// import { notifications } from '@mantine/notifications';
// import { useNavigate } from 'react-router';
// import { useAuthStore } from '../../../../stores/useAuthStore';
// import { useVerifyOtpLogin } from '../api/auth.hooks';

// export default function VerifyOtp() {
//   const navigate = useNavigate();
//   const email = sessionStorage.getItem('otpEmail');
//   const verifyOtp = useVerifyOtpLogin();
//   const { login } = useAuthStore();

//   const form = useForm({
//     initialValues: {
//       otp: '',
//     },
//     validate: {
//       otp: (value) => (value.length !== 6 ? 'Enter a valid 6-digit OTP' : null),
//     },
//   });

//   const handleSubmit = form.onSubmit(async ({ otp }) => {
//     if (!email) {
//       notifications.show({ message: 'Missing login email. Please login again.', color: 'red' });
//       return navigate('/login');
//     }

//     try {
//       const res = await verifyOtp.mutateAsync({ identifier: email, otp });

//       const accessToken = res?.data?.accessToken;
//       const refreshToken = res?.data?.refreshToken;

//       if (!accessToken || !refreshToken) {
//         throw new Error('Invalid token response');
//       }

//       login({ accessToken, refreshToken });
//       notifications.show({ message: 'Login successful', color: 'green' });

//       const payload = JSON.parse(atob(accessToken.split('.')[1]));
//       const staticRole = payload.staticRole;

//       switch (staticRole) {
//         case 'SUPER_ADMIN':
//           navigate('/super-admin');
//           break;
//         case 'WL_ADMIN':
//           navigate('/wl-admin');
//           break;
//         case 'EMPLOYEE':
//         case 'D':
//         case 'R':
//         case 'SD':
//           navigate('/dashboard');
//           break;
//         default:
//           navigate('/unauthorized');
//       }
//     } catch (err: any) {
//       notifications.show({
//         message: err?.response?.data?.message || 'OTP verification failed',
//         color: 'red',
//       });
//     }
//   });

//   return (
//     <Container size="xs" my={40}>
//       <Title ta="center">Enter OTP</Title>
//       <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
//         <form onSubmit={handleSubmit}>
//           <TextInput
//             label="OTP"
//             withAsterisk
//             placeholder="6-digit code"
//             {...form.getInputProps('otp')}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             mt="md"
//             loading={verifyOtp.isPending}
//           >
//             Verify OTP
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// }
