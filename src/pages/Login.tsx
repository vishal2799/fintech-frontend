import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Group, Checkbox, Anchor } from '@mantine/core';
import API from '../api/axios';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthStore();

const handleLogin = async () => {
  setLoading(true);
  try {
    const { data } = await API.post('/auth/login', { email, password });

    const accessToken = data?.data?.accessToken;
    const refreshToken = data?.data?.refreshToken;
    login({ accessToken, refreshToken });

    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const roles: string[] = payload.roleNames || [];

    if (roles.includes('SUPER_ADMIN')) {
      navigate('/super-admin');
    } else if (roles.includes('WL_ADMIN')) {
      navigate('/wl-admin');
    } else {
      navigate('/unauthorized');
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};


  return (
      <Container size={"xs"} my={40}>
      <Title ta="center">
        Welcome back!
      </Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required radius="md" value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" radius="md" onClick={handleLogin} loading={loading}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
