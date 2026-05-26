'use client'

import { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  ChevronRight,
  Check,
  X,
  Mail,
  Lock,
  Trash2,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

function SettingsSection({ 
  title, 
  description, 
  children 
}: { 
  title: string
  description?: string
  children: React.ReactNode 
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {children}
      </div>
    </div>
  )
}

function SettingsRow({ 
  icon: Icon, 
  label, 
  description,
  action,
  danger = false
}: { 
  icon: React.ElementType
  label: string
  description?: string
  action: React.ReactNode
  danger?: boolean
}) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          danger 
            ? 'bg-red-100 dark:bg-red-950/50' 
            : 'bg-gray-100 dark:bg-gray-800'
        }`}>
          <Icon className={`w-5 h-5 ${danger ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`} />
        </div>
        <div>
          <p className={`font-medium ${danger ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{label}</p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}

function Toggle({ 
  enabled, 
  onChange 
}: { 
  enabled: boolean
  onChange: (value: boolean) => void 
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
      }`}
    >
      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  
  // Settings state
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [criticalOnly, setCriticalOnly] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('sv')

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inställningar</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Hantera ditt konto och appinställningar</p>
      </div>

      {/* Profile section */}
      <SettingsSection title="Profil" description="Din kontoinformation">
        <div className="p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{user?.name || 'Användare'}</p>
            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
          <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Redigera
          </button>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifikationer" description="Hur och när du får aviseringar">
        <SettingsRow
          icon={Bell}
          label="Push-notifikationer"
          description="Få notifikationer på din enhet"
          action={<Toggle enabled={notifications} onChange={setNotifications} />}
        />
        <SettingsRow
          icon={Mail}
          label="E-postaviseringar"
          description="Få sammanfattningar via e-post"
          action={<Toggle enabled={emailAlerts} onChange={setEmailAlerts} />}
        />
        <SettingsRow
          icon={Shield}
          label="Endast kritiska hot"
          description="Avisera endast för nivå 4-5 hot"
          action={<Toggle enabled={criticalOnly} onChange={setCriticalOnly} />}
        />
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection title="Utseende" description="Anpassa appens utseende">
        <SettingsRow
          icon={darkMode ? Moon : Sun}
          label="Mörkt läge"
          description="Använd mörkt tema"
          action={<Toggle enabled={darkMode} onChange={setDarkMode} />}
        />
        <SettingsRow
          icon={Globe}
          label="Språk"
          description="Välj appens språk"
          action={
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="sv">Svenska</option>
              <option value="en">English</option>
            </select>
          }
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection title="Säkerhet" description="Lösenord och kontoåtgärder">
        <SettingsRow
          icon={Lock}
          label="Byt lösenord"
          description="Uppdatera ditt lösenord"
          action={
            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              <span className="text-sm font-medium">Ändra</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          }
        />
        <SettingsRow
          icon={LogOut}
          label="Logga ut"
          description="Logga ut från ditt konto"
          action={
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Logga ut
            </button>
          }
        />
        <SettingsRow
          icon={Trash2}
          label="Radera konto"
          description="Ta bort ditt konto permanent"
          danger
          action={
            <button className="px-4 py-2 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
              Radera
            </button>
          }
        />
      </SettingsSection>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <Check className="w-5 h-5" />
          <span className="font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80 transition">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
