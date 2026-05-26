'use client'

import { useState } from 'react'
import { Shield, Smartphone, AlertCircle, MessageSquare, Share2, Volume2, Lock, Users, Zap, Eye } from 'lucide-react'

export default function SmartFeatures() {
  const [activeTab, setActiveTab] = useState('risks')

  const tabs = [
    { id: 'risks', label: 'Faktiska hot', icon: AlertCircle },
    { id: 'how', label: 'Hur ENOUGH fungerar', icon: Shield },
    { id: 'action', label: 'Vad du kan göra', icon: Zap },
    { id: 'responsibility', label: 'Ditt ansvar', icon: Users },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-2 mb-12 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          {/* RISKS */}
          {activeTab === 'risks' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Faktiska hot dina barn möter online</h2>
                <p className="text-gray-600 dark:text-gray-400">Detta händer just nu, i appar och spel som ditt barn använder dagligen.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
                  <div className="flex items-start gap-4">
                    <Smartphone className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Gångrekrytering via Discord och Roblox</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Organiserade grupper rekryterar barn genom spel och chatt-appar. De lockar med pengar och status.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Predatörer och grooming</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Vuxna som ger sig ut för barn för att bygga förtroendet innan de ber om bilder eller möten.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900">
                  <div className="flex items-start gap-4">
                    <Share2 className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Sextortion och hot om att sprida privata bilder</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Barn lockas att skicka bilder, sedan utpressas de eller hotas att bilderna sprids.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-900">
                  <div className="flex items-start gap-4">
                    <Volume2 className="w-6 h-6 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Trakasserier och cybermobbing</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Upprepade hot, förnedringar och isolering som kan leda till depression och självskada.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HOW IT WORKS */}
          {activeTab === 'how' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Så fungerar ENOUGH – ingen konstant övervakning</h2>
                <p className="text-gray-600 dark:text-gray-400">Vi använder AI för att känna igen farligt beteende. Vi lyssnar bara när något potentiellt farligt detekteras.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">1</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">AI tränad på faktiska hot</h3>
                      <p className="text-gray-700 dark:text-gray-300">Vår AI har analyserats på tusentals fall av gångrekrytering, grooming, trakasserier och sextortion för att känna igen mönster.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">2</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">Smart detektion, inte konstant spårning</h3>
                      <p className="text-gray-700 dark:text-gray-300">Appen lyssnar inte varje sekund. Den väcker bara när något möjligt hot detekteras – ett meddelande från okänd vuxen, rekryteringsprat, eller försök till utpressning.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">3</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">Automatisk sparning av bevis</h3>
                      <p className="text-gray-700 dark:text-gray-300">När något farligt detekteras, sparas meddelanden, bilder och transkriberingar av röstsamtal säkert. Du kan aldrig förlora beviset.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">4</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">Krypterat och privat</h3>
                      <p className="text-gray-700 dark:text-gray-300">All data är end-to-end-krypterad. ENOUGH kan aldrig se innehållet på barnets meddelanden – bara AI-resultaten.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WHAT YOU CAN DO */}
          {activeTab === 'action' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Vad du kan göra när något detekteras</h2>
                <p className="text-gray-600 dark:text-gray-400">Med en klick kan du agera direkt och professionellt.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center gap-3">
                    <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Rapportera direkt till plattformen</h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">En knapp skickar allt bevis direkt till Roblox, Discord, Instagram eller andra plattformar. Ingen manuell utredning – bara sänd.</p>
                </div>

                <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Spara och logga allt</h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Transkriberingar av hotfulla röstsamtal, screenshots av chatt, alla bevis lagras säkert och datumstämplat.</p>
                </div>

                <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Agera omedelbar</h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Blockera kontakter, aktivera säkerhet, eller kontakta polisen med fullt dokumenterat bevis av hotet.</p>
                </div>

                <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Förstå vad som hände</h3>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Vi förklarar exakt vilken typ av hot det var, vilka tecken du såg, och nästa steg för att skydda ditt barn.</p>
                </div>
              </div>
            </div>
          )}

          {/* YOUR RESPONSIBILITY */}
          {activeTab === 'responsibility' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Din roll som förälder – det viktigaste verktyget</h2>
                <p className="text-gray-600 dark:text-gray-400">Teknologin är bara halvparten. Du är den andra halvan.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-transparent border border-green-200 dark:border-green-900">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Prata öppet – ofta</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><span className="text-green-600">✓</span> Fråga vad de gör online utan att döma</li>
                    <li className="flex gap-2"><span className="text-green-600">✓</span> Lär dem känna igen hot utan att skrämma</li>
                    <li className="flex gap-2"><span className="text-green-600">✓</span> Berätta att de aldrig är i trubbel om de berättar för dig</li>
                    <li className="flex gap-2"><span className="text-green-600">✓</span> Fråga varje vecka – "Hänt något konstigt online?"</li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-50/50 dark:from-yellow-900/20 dark:to-transparent border border-yellow-200 dark:border-yellow-900">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Sätt gränser – respektfullt</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><span className="text-yellow-600">✓</span> Ingen telefon under måltider</li>
                    <li className="flex gap-2"><span className="text-yellow-600">✓</span> Telefonen är inte en nattlampa</li>
                    <li className="flex gap-2"><span className="text-yellow-600">✓</span> Enskilda appar kräver ålder – respektera det</li>
                    <li className="flex gap-2"><span className="text-yellow-600">✓</span> Känn till barnets vänner både online och offline</li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-900/20 dark:to-transparent border border-blue-200 dark:border-blue-900">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Fortsätt lära dig</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Prova själv – ladda Roblox, Discord, TikTok</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Förstå vilka appar som är populära och varför</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Håll dig uppdaterad på nya trender och faror</li>
                    <li className="flex gap-2"><span className="text-blue-600">✓</span> Använd ENOUGH – det ger dig själv kunskap</li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-50/50 dark:from-purple-900/20 dark:to-transparent border border-purple-200 dark:border-purple-900">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Agera tillsammans vid hot</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-2"><span className="text-purple-600">✓</span> Inte böter eller skam – stöd och säkerhet</li>
                    <li className="flex gap-2"><span className="text-purple-600">✓</span> Blockera eller rapportera tillsammans</li>
                    <li className="flex gap-2"><span className="text-purple-600">✓</span> Kontakta polisen vid allvarliga hot</li>
                    <li className="flex gap-2"><span className="text-purple-600">✓</span> Söka psykologstöd om barnet traumatiseras</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Du kan inte skydda ditt barn från allt. Men du kan vara närvarande.</p>
          <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
            Börja med ENOUGH idag
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </section>
  )
}
