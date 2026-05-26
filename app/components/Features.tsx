'use client'

import { Smartphone, Users, TrendingUp, Settings } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Smartphone,
      title: 'Multi-Device Support',
      description: 'Övervaka aktivitet på telefon, surfplatta och dator från ett ställe'
    },
    {
      icon: Users,
      title: 'Familj-fokuserad',
      description: 'Hantera flera barn med individualiserade regler och begränsningar'
    },
    {
      icon: TrendingUp,
      title: 'Trender & Insights',
      description: 'Förstå mönster i barnets online-beteende med intelligenta grafer'
    },
    {
      icon: Settings,
      title: 'Flexibel konfiguration',
      description: 'Anpassa varje inställning för att passa din familjs behov perfekt'
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-4">
            Huvudfunktioner
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Allt du behöver för att skydda dina barn online, på ett intuitivt sätt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/30 hover:border-primary hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-blue-600/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold font-bold text-lg text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
