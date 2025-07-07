import { Navigate } from 'react-router'
import { useAuth } from './AuthContext'

export default function RequireAuth({
  allowedRoles,
  children,
}: {
  allowedRoles: string[]
  children: React.ReactNode
}) {
  const { isAuthenticated, role, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(role || '')) return <Navigate to="/unauthorized" replace />

  return <>{children}</>
}
