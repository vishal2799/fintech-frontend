import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
  Checkbox,
  Anchor,
  Box,
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { loginSchema, type LoginInput } from '../schema/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import axios from '../../../api/axios';
import { getUserLocation } from '../../../utils/getUserLocation';
import { usePortal } from '../../../context/PortalContext';

const Login = () => {
     const { portalPath, tenant, type } = usePortal();

  const navigate = useNavigate();

  const form = useForm<LoginInput>({
    initialValues: {
      email: '',
      password: '',
      latitude: 0,
      longitude: 0,
      accuracy: 0
    },
    validate: zod4Resolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (values: LoginInput) =>
      axios.post('/auth/login', values).then((res) => res.data),
    onSuccess: (_res, variables) => {
      sessionStorage.setItem('otpEmail', variables.email);
      notifications.show({ message: 'OTP sent to your email', color: 'green' });
      navigate(`${portalPath}/verify-otp`);
    },
    onError: (err: any) => {
      notifications.show({
        message: err?.response?.data?.message || 'Login failed',
        color: 'red',
      });
    },
  });

  const handleSubmit = async () => {
    try {
      const { latitude, longitude, accuracy } = await getUserLocation();
sessionStorage.setItem('userLocation', JSON.stringify({ latitude, longitude, accuracy }));

      mutation.mutate({
        ...form.values,
        latitude,
        longitude,
        accuracy
      });
    } catch (error: any) {
      notifications.show({
        message: error.message || 'Failed to get location.',
        color: 'red',
      });
    }
  };

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
      <Container size="md" maw={500} w="100%">
        <Box mb="lg">
          {type === 'superadmin' ? (
            <>
              <Group justify="center" mb="xs">
                <Title order={2} ta="center">VMudra</Title>
              </Group>
              <Title order={3} ta="center" c="dimmed">
                Welcome back, Super Admin!
              </Title>
            </>
          ) : (
            <>
              <Group justify="center" mb="xs">
                <Title order={2} ta="center">{tenant?.name || 'Tenant'}</Title>
              </Group>
              <Title order={3} ta="center" c="dimmed">
                Welcome back!
              </Title>
            </>
          )}
        </Box>

        <Paper withBorder shadow="sm" p={"lg"} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              withAsterisk
              radius="md"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              radius="md"
              withAsterisk
              {...form.getInputProps('password')}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" radius="md" type="submit" loading={mutation.isPending}>
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

// import {
//   TextInput,
//   PasswordInput,
//   Button,
//   Paper,
//   Title,
//   Container,
//   Group,
//   Checkbox,
//   Anchor,
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { useMutation } from '@tanstack/react-query';
// import { notifications } from '@mantine/notifications';
// import { useForm } from '@mantine/form';
// import { zod4Resolver } from 'mantine-form-zod-resolver';

// import axios from '../../../../api/axios';
// import { loginSchema, type LoginInput } from '../schema/auth.schema';
// import { getUserLocation } from '../../../../utils/clientMeta';

// const Login = () => {
//   const navigate = useNavigate();

//   const form = useForm({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validate: zod4Resolver(loginSchema),
//   });

//   const mutation = useMutation({
//     mutationFn: async (
//       values: LoginInput & { latitude: string; longitude: string }
//     ) => {
//       const res = await axios.post('/auth/login', values);
//       return res.data;
//     },
//     onSuccess: (_res, variables) => {
//       sessionStorage.setItem('otpEmail', variables.email);
//       notifications.show({ message: 'OTP sent to your email', color: 'green' });
//       navigate('/verify-otp');
//     },
//     onError: (err: any) => {
//       notifications.show({
//         message: err?.response?.data?.message || 'Login failed',
//         color: 'red',
//       });
//     },
//   });

// const handleSubmit = async (values: LoginInput) => {
//   try {
//     const location = await getUserLocation();

//     mutation.mutate({
//       ...values,
//        latitude: location.latitude.toString(),
//       longitude: location.longitude.toString(),
//     });
//   } catch (error: any) {
//     notifications.show({
//       message:
//         error.message === 'User denied Geolocation'
//           ? 'Location access is required to sign in.'
//           : 'Unable to fetch location. Please ensure it’s enabled.',
//       color: 'red',
//     });
//   }
// };


//   return (
//     <Container size="xs" my={40}>
//       <Title ta="center">Welcome back!</Title>

//       <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <TextInput
//             label="Email"
//             placeholder="you@example.com"
//             withAsterisk
//             radius="md"
//             {...form.getInputProps('email')}
//           />
//           <PasswordInput
//             label="Password"
//             placeholder="Your password"
//             mt="md"
//             radius="md"
//             withAsterisk
//             {...form.getInputProps('password')}
//           />
//           <Group justify="space-between" mt="lg">
//             <Checkbox label="Remember me" />
//             <Anchor component="button" size="sm">
//               Forgot password?
//             </Anchor>
//           </Group>
//           <Button
//             fullWidth
//             mt="xl"
//             radius="md"
//             type="submit"
//             loading={mutation.isPending}
//           >
//             Sign in
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;



// import {
//   TextInput,
//   PasswordInput,
//   Button,
//   Paper,
//   Title,
//   Container,
//   Group,
//   Checkbox,
//   Anchor,
// } from '@mantine/core';
// import { useNavigate } from 'react-router';
// import { loginSchema, type LoginInput } from '../schema/auth.schema';
// import { useMutation } from '@tanstack/react-query';
// import { notifications } from '@mantine/notifications';
// import { useForm } from '@mantine/form';
// import { zod4Resolver } from 'mantine-form-zod-resolver';
// import axios from '../../../../api/axios';
// import { getClientMeta } from '../../../../utils/clientMeta';

// const Login = () => {
//   const navigate = useNavigate();

//   const form = useForm({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validate: zod4Resolver(loginSchema),
//   });
  

//   const mutation = useMutation({
//     mutationFn: (values: LoginInput) => axios.post('/auth/login', values).then(res => res.data),
//     onSuccess: (_res, variables) => {
//       // Instead of saving token → redirect to OTP page
//       sessionStorage.setItem('otpEmail', variables.email);
//       notifications.show({ message: 'OTP sent to your email', color: 'green' });
//       navigate('/verify-otp');
//     },
//     onError: (err: any) => {
//       notifications.show({
//         message: err?.response?.data?.message || 'Login failed',
//         color: 'red',
//       });
//     },
//   });

//   return (
//     <Container size="xs" my={40}>
//       <Title ta="center">Welcome back!</Title>

//       <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
//         <form onSubmit={form.onSubmit(async (values) => {
//   const meta = await getClientMeta(); // get IP and location
//   mutation.mutate({ ...values, ...meta });
// })}>
//         {/* <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}> */}
//           <TextInput
//             label="Email"
//             placeholder="you@example.com"
//             withAsterisk
//             radius="md"
//             {...form.getInputProps('email')}
//           />
//           <PasswordInput
//             label="Password"
//             placeholder="Your password"
//             mt="md"
//             radius="md"
//             withAsterisk
//             {...form.getInputProps('password')}
//           />
//           <Group justify="space-between" mt="lg">
//             <Checkbox label="Remember me" />
//             <Anchor component="button" size="sm">Forgot password?</Anchor>
//           </Group>
//           <Button fullWidth mt="xl" radius="md" type="submit" loading={mutation.isPending}>
//             Sign in
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;
