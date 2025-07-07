import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  role: string | null
  isLoading: boolean
  login: (role: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedRole = localStorage.getItem('user-role')
    if (savedRole) setRole(savedRole)
    setIsLoading(false)
  }, [])

  const login = (newRole: string) => {
    setRole(newRole)
    localStorage.setItem('user-role', newRole)
  }

  const logout = () => {
    setRole(null)
    localStorage.removeItem('user-role')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!role,
        role,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
