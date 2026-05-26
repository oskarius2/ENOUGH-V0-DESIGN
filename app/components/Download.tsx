'use client'

import { Apple, DownloadCloud } from 'lucide-react'

export default function Download() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-gray-200 dark:border-gray-800 p-12 text-center space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Redo att skydda ditt barn?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ladda ner ENOUGH idag och börja skapa en säker digital miljö för hela familjen.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 group">
              <Apple className="w-6 h-6" />
              <span>App Store</span>
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-3 group">
              <DownloadCloud className="w-6 h-6" />
              <span>Google Play</span>
            </button>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Tillgänglig för iOS 12+ och Android 8+</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <span className="font-medium text-gray-900 dark:text-white">Kostnadsfri</span>
              <span className="text-gray-600 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">Ingen annonsering</span>
              <span className="text-gray-600 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">GDPR-kompatibel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

