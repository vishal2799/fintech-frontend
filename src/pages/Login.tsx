import { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
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

  // const handleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const {data} = await API.post('/auth/login', { email, password });
  //     localStorage.setItem('accessToken', data?.data?.accessToken);
  //     localStorage.setItem('refreshToken', data?.data?.refreshToken);

  //     console.log(data);

  //     // Optional: Save roles and permissions too
  //     const payload = JSON.parse(atob(data?.data?.accessToken.split('.')[1]));

  //      // 3️⃣  Always stringify complex values
  //     localStorage.setItem('roles', JSON.stringify(payload.roleNames || []));
  //     localStorage.setItem('permissions', JSON.stringify(payload.permissions || []));

  //     const roles: string[] = payload.roleNames || [];
      
  //     // Redirect based on role
  //     if (roles.includes('SUPER_ADMIN')) {
  //       navigate('/super-admin');
  //     } else if (roles.includes('WL_ADMIN')) {
  //       navigate('/wl-admin');
  //     } else {
  //       navigate('/unauthorized');
  //     }
  //   } catch (err: any) {
  //     alert(err.response?.data?.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Container size={420} my={40}>
      <Title mb={30}>Super Admin Login</Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <PasswordInput label="Password" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} required mt="md" />
        <Button fullWidth mt="xl" onClick={handleLogin} loading={loading}>
          Sign In
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
