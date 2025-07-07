import { Button, Container, Title } from '@mantine/core'
import { useNavigate } from 'react-router'
import { useAuth } from '../app/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (role: any) => {
    login(role)
    if (role === 'SUPER_ADMIN') navigate('/superadmin')
    else navigate('/')
  }

  return (
    <Container>
      <Title>Login as</Title>
      <Button onClick={() => handleLogin('SUPER_ADMIN')} m="xs">Super Admin</Button>
      <Button onClick={() => handleLogin('WL_ADMIN')} m="xs">WL Admin</Button>
    </Container>
  )
}
