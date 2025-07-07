import { Navigate } from 'react-router'
import { useAuth } from './AuthContext'

export default function RequireAuth({
  allowedRoles,
  children
}: {
  allowedRoles: string[]
  children: React.ReactNode
}) {
  const { isAuthenticated, role } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(role || '')) return <Navigate to="/unauthorized" replace />

  return <>{children}</>
}
