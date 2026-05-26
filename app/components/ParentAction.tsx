'use client'

import { Heart, MessageCircle, Target } from 'lucide-react'

export default function ParentAction() {
  const actions = [
    {
      icon: MessageCircle,
      title: 'Kommunicera',
      description: 'Starta samtal baserat på vad appen detekterar. Känsliga ämnen blir lättare att diskutera.'
    },
    {
      icon: Target,
      title: 'Agera snabbt',
      description: 'Ta omedelbar åtgärd med blockering, begränsning eller stänga av enheten om det behövs.'
    },
    {
      icon: Heart,
      title: 'Stödja utvecklingen',
      description: 'Hjälp ditt barn att navigera digitalt utan att bli övervakad eller kontrollerad hårt.'
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-4">
            Det föräldern kan göra
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ENOUGH ger dig verktygen för att agera när det behövs, men också möjligheten att stödja barnets utveckling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <div
                key={index}
                className="p-8 rounded-lg bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-blue-600/10 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold font-bold text-lg text-gray-900 dark:text-white mb-3">{action.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{action.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
