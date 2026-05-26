'use client'

import { Mail, MapPin, Linkedin, Twitter, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">ENOUGH</span>
            </div>
            <p className="text-sm text-gray-400">
              Barnskyddsappen för ett säkrare internet
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm">Produkt</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Funktioner</a></li>
              <li><a href="#" className="hover:text-white transition">Säkerhet</a></li>
              <li><a href="#" className="hover:text-white transition">Prissättning</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm">Företag</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Om oss</a></li>
              <li><a href="#" className="hover:text-white transition">Kontakt</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm">Kontakt</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@enough.app" className="hover:text-white transition">hello@enough.app</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Sverige</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2024 ENOUGH. Alla rättigheter förbehållna.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition">Integritetspolicy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition">Användarvillkor</a>
            <div className="flex gap-2">
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-gray-400 hover:text-white">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-gray-400 hover:text-white">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
