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
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { loginSchema, type LoginInput } from './auth.schema';
import { useMutation } from '@tanstack/react-query';
import axios from '../api/axios';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '../stores/useAuthStore';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(loginSchema)
  });

  const mutation = useMutation({
    mutationFn: (values: LoginInput) => axios.post('/auth/login', values).then(res => res.data),
    onSuccess: (res) => {
      const accessToken = res?.data?.accessToken;
      const refreshToken = res?.data?.refreshToken;
      login({ accessToken, refreshToken });

      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const staticRole = payload.staticRole;

      notifications.show({ message: 'Login successful', color: 'green' });

      switch (staticRole) {
        case 'SUPER_ADMIN':
          navigate('/super-admin');
          break;
        case 'WL_ADMIN':
          navigate('/wl-admin');
          break;
        case 'SD':
        case 'D':
        case 'R':
        case 'EMPLOYEE':
          navigate('/dashboard');
          break;
        default:
          navigate('/unauthorized');
      }
    },
    onError: (err: any) => {
      notifications.show({
        message: err?.response?.data?.message || 'Login failed',
        color: 'red',
      });
    },
  });

  return (
    <Container size="xs" my={40}>
      <Title ta="center">Welcome back!</Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
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
  );
};

export default Login;
