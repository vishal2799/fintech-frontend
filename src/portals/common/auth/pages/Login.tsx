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
import { loginSchema, type LoginInput } from '../schema/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import axios from '../../../../api/axios';

const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (values: LoginInput) => axios.post('/auth/login', values).then(res => res.data),
    onSuccess: (_res, variables) => {
      // Instead of saving token → redirect to OTP page
      sessionStorage.setItem('otpEmail', variables.email);
      notifications.show({ message: 'OTP sent to your email', color: 'green' });
      navigate('/verify-otp');
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
            <Anchor component="button" size="sm">Forgot password?</Anchor>
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
