'use client'

import { useState } from 'react'
import { Menu, X, Shield, ChevronRight } from 'lucide-react'

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Hem' },
    { id: 'risks', label: 'Risker' },
    { id: 'how', label: 'Hur det fungerar' },
    { id: 'actions', label: 'Dina verktyg' },
    { id: 'faq', label: 'FAQ' },
  ]

  const handleNav = (id: string) => {
    setActiveSection(id)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">ENOUGH</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => handleNav('download')}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
            >
              Ladda ner
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-1 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNav('download')}
              className="w-full mt-4 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Ladda ner appen
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
