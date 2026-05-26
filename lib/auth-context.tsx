'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { 
  type User, 
  getUser, 
  isAuthenticated, 
  login as authLogin, 
  signup as authSignup,
  loginWithGoogle as authLoginWithGoogle,
  logout as authLogout 
} from './auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await authLogin(email, password)
    if (result.success) {
      setUser(getUser())
    }
    return result
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const result = await authSignup(email, password, name)
    if (result.success) {
      setUser(getUser())
    }
    return result
  }, [])

  const loginWithGoogle = useCallback(async () => {
    const result = await authLoginWithGoogle()
    if (result.success) {
      setUser(getUser())
    }
    return result
  }, [])

  const logout = useCallback(() => {
    authLogout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: isAuthenticated(),
        login,
        signup,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
