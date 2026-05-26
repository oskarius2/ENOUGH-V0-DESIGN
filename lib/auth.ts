// Mock authentication functions
// Prepared for real backend integration later

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: number
}

const STORAGE_KEY = 'enough_session'

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'demo@enough.se': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@enough.se',
      name: 'Demo Användare',
      createdAt: new Date().toISOString()
    }
  }
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  
  try {
    const session: AuthSession = JSON.parse(stored)
    
    // Check if expired
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    
    return session
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function getUser(): User | null {
  const session = getSession()
  return session?.user ?? null
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const emailLower = email.toLowerCase()
  const mockUser = MOCK_USERS[emailLower]
  
  if (!mockUser || mockUser.password !== password) {
    return { success: false, error: 'Felaktig e-post eller lösenord' }
  }
  
  const session: AuthSession = {
    user: mockUser.user,
    token: generateToken(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  
  return { success: true }
}

export async function signup(
  email: string, 
  password: string, 
  name: string
): Promise<{ success: boolean; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const emailLower = email.toLowerCase()
  
  if (MOCK_USERS[emailLower]) {
    return { success: false, error: 'E-postadressen är redan registrerad' }
  }
  
  // Create new user
  const newUser: User = {
    id: generateToken(),
    email: emailLower,
    name,
    createdAt: new Date().toISOString()
  }
  
  // Add to mock database
  MOCK_USERS[emailLower] = { password, user: newUser }
  
  // Auto login after signup
  const session: AuthSession = {
    user: newUser,
    token: generateToken(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  
  return { success: true }
}

export async function loginWithGoogle(): Promise<{ success: boolean; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock Google OAuth - create a demo user
  const googleUser: User = {
    id: 'google-' + generateToken(),
    email: 'google.user@gmail.com',
    name: 'Google Användare',
    avatar: 'https://lh3.googleusercontent.com/a/default-user',
    createdAt: new Date().toISOString()
  }
  
  const session: AuthSession = {
    user: googleUser,
    token: generateToken(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  
  return { success: true }
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}
