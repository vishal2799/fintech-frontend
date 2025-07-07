import { createContext, useContext, useState } from 'react'

type Role = 'SUPER_ADMIN' | 'WL_ADMIN' | 'API_CLIENT' | 'SD' | 'D' | 'R'

interface AuthState {
  isAuthenticated: boolean
  role: Role | null
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null)
  const [isAuthenticated, setAuthenticated] = useState(false)

  const login = (newRole: Role) => {
    setRole(newRole)
    setAuthenticated(true)
  }

  const logout = () => {
    setRole(null)
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
