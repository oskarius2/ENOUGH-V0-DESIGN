'use client'

export default function AIScale() {
  const scales = [
    { level: 1, title: 'Minimal', description: 'Inget innehål filtreras' },
    { level: 2, title: 'Låg', description: 'Bara uppenbart farligt innehål flaggas' },
    { level: 3, title: 'Medel', description: 'Rekommenderad nivå för de flesta barn' },
    { level: 4, title: 'Hög', description: 'Strikt filtrering av riskanat innehål' },
    { level: 5, title: 'Maximal', description: 'Nästan allt potentiellt farligt blockeras' },
  ]

  return (
    <section className="py-20 bg-blue-50 dark:bg-blue-900/30/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bold text-gray-900 dark:text-white mb-4">
            AI-drivna säkerhetsnivåer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Justera skyddet baserat på ditt barns ålder och mognadsnivå
          </p>
        </div>

        <div className="space-y-3">
          {scales.map((scale) => (
            <div
              key={scale.level}
              className="relative p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-background hover:border-primary transition-all duration-300 group cursor-pointer hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                    <span className="font-bold font-bold text-blue-600 dark:text-blue-400">{scale.level}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold font-bold text-gray-900 dark:text-white">{scale.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{scale.description}</p>
                  </div>
                </div>
                <div className="hidden sm:flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i < scale.level ? 'bg-blue-600' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
