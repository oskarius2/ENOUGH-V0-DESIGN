import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/dashboard']

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check for session cookie/token
  // Note: In a real app, you'd verify the JWT here
  // For mock auth, we check localStorage on client side instead
  // This middleware just handles the basic redirect logic
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname === route)
  
  // For now, let client-side handle auth checks
  // This is because mock auth uses localStorage which isn't available server-side
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup'
  ]
}
