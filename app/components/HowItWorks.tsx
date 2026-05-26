'use client'

import { Download, MessageCircle, Settings, CheckCircle2 } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Download,
      title: 'Ladda ner appen',
      description: 'Installera ENOUGH på förälderns och barnets enheter från App Store eller Google Play'
    },
    {
      icon: Settings,
      title: 'Ställ in regler',
      description: 'Konfigurera säkerhetsnivår, tidsschema och innehållsfilter anpassat för varje barn'
    },
    {
      icon: CheckCircle2,
      title: 'Börja övervaka',
      description: 'Få realtidsuppdateringar och dagliga rapporter om online-aktiviteten'
    },
    {
      icon: MessageCircle,
      title: 'Kommunicera',
      description: 'Diskutera det appen hittar med barn på ett konstruktivt sätt'
    },
  ]

  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-900/30/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-4">
            Så här fungerar det
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Börja skydda ditt barn på bara några minuter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="p-6 rounded-lg bg-background border border-gray-200 dark:border-gray-800 hover:border-primary transition-all duration-300 h-full">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-600 text-blue-600 dark:text-blue-400-foreground flex items-center justify-center font-bold font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="p-3 rounded-lg bg-blue-600/10 w-fit mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
