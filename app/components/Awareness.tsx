'use client'

import { AlertCircle, Shield, Eye, Lock } from 'lucide-react'

export default function Awareness() {
  const threats = [
    { icon: AlertCircle, title: 'Farligt innehål', description: 'Skador från olämpligt material online' },
    { icon: Shield, title: 'Övervakning', description: 'Obehörig spårning och datainsamling' },
    { icon: Eye, title: 'Privat skada', description: 'Exponering av personlig information' },
    { icon: Lock, title: 'Cyberbullying', description: 'Trakasserier och hotelser online' },
  ]

  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-900/30/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-4">
            Barnen är utsatta online
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enligt studier möter 75% av barn någon form av hot online dagligen. Vi hjälper föräldrar att skydda dem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {threats.map((threat, index) => {
            const Icon = threat.icon
            return (
              <div
                key={index}
                className="p-6 rounded-lg bg-background border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-blue-600/10 w-fit mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold font-bold text-gray-900 dark:text-white mb-2">{threat.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{threat.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
