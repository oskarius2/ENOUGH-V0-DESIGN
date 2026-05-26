'use client'

import { Zap, BarChart3, Brain, Bell } from 'lucide-react'

export default function Solutions() {
  const solutions = [
    {
      icon: Zap,
      title: 'Realtidsövervakning',
      description: 'Få omedelbar varning vid potentiella hot och farligt innehål',
      color: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: BarChart3,
      title: 'Detaljerade rapporter',
      description: 'Förstå vad ditt barn gör online med verklig data och statistik',
      color: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Brain,
      title: 'AI-driven analys',
      description: 'Maskininlärning identifierar risker innan de blir problem',
      color: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Bell,
      title: 'Smarta notiser',
      description: 'Få bara relevanta meddelanden när det verkligen behövs',
      color: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-4">
            ENOUGH löser detta
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Vi kombinerar moderna tekniker för att ge föräldrar full kontroll och sinnesro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <div
                key={index}
                className="p-8 rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className={`p-3 rounded-lg w-fit mb-4 ${solution.color} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${solution.iconColor}`} />
                </div>
                <h3 className="font-bold font-bold text-lg text-gray-900 dark:text-white mb-3">{solution.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{solution.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
