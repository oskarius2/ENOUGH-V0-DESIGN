'use client'

import { AlertTriangle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-950 pt-20 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="space-y-12">
          {/* Main Message */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">En verklighet vi måste prata om</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              De flesta föräldrar vet inte vad deras barn gör online
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Rekrytering till gängkriminalitet sker via Discord, Roblox och Instagram. Predatörer använder spel för att kontakta barn. Falska vänner ber om bilder. Det är ingen skrämseltaktik – det är vardagen för tusentals familjer i Sverige just nu.
            </p>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">73%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">av föräldrar övervakar INTE vad deras barn gör online</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">+200%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">ökning i gängrekrytering via appar senaste året</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1/5</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">barn möter något potentiellt farligt online varje månad</div>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/20 dark:to-transparent rounded-2xl border border-blue-200 dark:border-blue-900 p-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ENOUGH är inte spionage. Det är omtanke.
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Vi ger föräldrar verktyg att förstå utan att invada privatsphären. Appen lyssnar bara när något potentiellt farligt detekteras – aldrig konstant. Du kan rapportera hot direkt till plattformerna, spara bevis på trakasserier och agera snabbt. Det handlar inte om kontroll. Det handlar om att vara närvarande.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Din roll som förälder är mer viktig än någonsin.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-200">
              Explore ENOUGH
            </button>
            <button className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              Läs FAQ
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

