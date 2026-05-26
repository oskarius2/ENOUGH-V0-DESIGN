'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Loader2, AlertCircle, Eye, EyeOff, Check } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function SignupPage() {
  const router = useRouter()
  const { signup, loginWithGoogle } = useAuth()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  // Password strength
  const passwordChecks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte')
      return
    }

    if (!acceptTerms) {
      setError('Du måste acceptera användarvillkoren')
      return
    }

    if (passwordStrength < 2) {
      setError('Lösenordet är för svagt')
      return
    }

    setIsLoading(true)

    const result = await signup(email, password, name)
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Ett fel uppstod')
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setIsGoogleLoading(true)

    const result = await loginWithGoogle()
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Ett fel uppstod')
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ENOUGH</h1>
          </Link>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Skapa ett konto</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span>Fortsätt med Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">eller</span>
            </div>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Namn
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ditt namn"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-postadress
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@email.se"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lösenord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Skapa ett lösenord"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password strength */}
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordStrength >= level
                            ? level === 1 ? 'bg-red-500' : level === 2 ? 'bg-yellow-500' : 'bg-green-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className={`flex items-center gap-2 text-xs ${passwordChecks.length ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${passwordChecks.length ? 'opacity-100' : 'opacity-30'}`} />
                      Minst 8 tecken
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordChecks.number ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${passwordChecks.number ? 'opacity-100' : 'opacity-30'}`} />
                      Innehåller en siffra
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${passwordChecks.special ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${passwordChecks.special ? 'opacity-100' : 'opacity-30'}`} />
                      Innehåller ett specialtecken
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bekräfta lösenord
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Bekräfta ditt lösenord"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500'
                  }`}
                />
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="mt-1 text-xs text-red-500">Lösenorden matchar inte</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Jag accepterar{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">användarvillkoren</a>
                  {' '}och{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">integritetspolicyn</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Skapar konto...</span>
                </>
              ) : (
                <span>Skapa konto</span>
              )}
            </button>
          </form>
        </div>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Har du redan ett konto?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
            Logga in
          </Link>
        </p>

        {/* Back to home */}
        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            Tillbaka till startsidan
          </Link>
        </p>
      </div>
    </div>
  )
}
