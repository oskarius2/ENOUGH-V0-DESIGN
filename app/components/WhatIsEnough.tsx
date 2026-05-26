'use client'

import { CheckCircle2 } from 'lucide-react'

export default function WhatIsEnough() {
  const features = [
    'Kontinuerlig övervakning av online-aktivitet',
    'Automatisk identifiering av farligt innehål',
    'Familjeöversikt med personaliserade rapporter',
    'Anpassningsbara säkerhetsregler per ålder',
    'Integritet-först arkitektur',
    'GDPR-kompatibel lagring',
  ]

  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-900/30/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-6">
              Vad är ENOUGH?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              ENOUGH är en komplett barnskyddslösning designad för moderna föräldrar. Vi kombinerar AI-driven innehållsanalys med familjevänliga kontroller för att skapa en säker digital miljö för dina barn.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Vårt fokus ligger på balans mellan övervakning och integritet, så att barn kan utforska internet säkert utan att känna sig övervakade.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-900 dark:text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-gray-200 dark:border-gray-800" />
            <div className="absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-600/20 mx-auto flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600/40" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Säker miljö för hela familjen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
