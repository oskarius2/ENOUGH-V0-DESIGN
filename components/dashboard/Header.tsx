'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import type { User as UserType } from '@/lib/auth'

interface HeaderProps {
  user: UserType | null
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Nytt hot detekterat', description: 'Nivå 3 hot på Emmas enhet', time: '5 min sedan', unread: true },
    { id: 2, title: 'Veckorapport klar', description: 'Din veckorapport är nu tillgänglig', time: '1 tim sedan', unread: true },
    { id: 3, title: 'Enhet online', description: 'Oscars dator är nu ansluten', time: '2 tim sedan', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {showMobileMenu ? (
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sök hot, enheter..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowUserMenu(false)
              }}
              className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white">Notiser</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                        notification.unread ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                        )}
                        <div className={notification.unread ? '' : 'ml-5'}>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{notification.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    href="/dashboard/notifications"
                    className="block text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Visa alla notiser
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu)
                setShowNotifications(false)
              }}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Användare'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Inställningar</span>
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Profil</span>
                  </Link>
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600 dark:text-red-400">Logga ut</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}
