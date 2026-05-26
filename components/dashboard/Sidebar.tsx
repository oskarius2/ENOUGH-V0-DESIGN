'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Monitor, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Översikt' },
  { href: '/dashboard/threats', icon: AlertTriangle, label: 'Hot' },
  { href: '/dashboard/devices', icon: Monitor, label: 'Enheter' },
  { href: '/dashboard/reports', icon: FileText, label: 'Rapporter' },
  { href: '/dashboard/settings', icon: Settings, label: 'Inställningar' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40 hidden" />
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-all duration-300 ease-out hidden lg:block ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-gray-900 dark:text-white">ENOUGH</span>
            )}
          </Link>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/25 border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Behöver du hjälp?</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Kontakta vår support om du har frågor.</p>
              <Link
                href="/help"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Få hjälp
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
