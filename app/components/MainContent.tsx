'use client'

import { 
  AlertTriangle, Shield, Smartphone, MessageSquare, Share2, 
  Volume2, Lock, Users, Zap, Eye, ChevronRight, Apple, 
  Play, ChevronDown, ChevronUp, ArrowLeft, Loader2, Check, Monitor
} from 'lucide-react'
import { useState, useCallback } from 'react'

interface MainContentProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 ${
      type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`}>
      {type === 'success' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80 transition">×</button>
    </div>
  )
}

// Reusable button with loading state
function ActionButton({ 
  onClick, 
  children, 
  variant = 'primary',
  loading = false,
  className = ''
}: { 
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
  className?: string
}) {
  const baseStyles = 'relative font-bold transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] hover:shadow-lg active:bg-blue-800',
    secondary: 'border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02] active:bg-gray-200 dark:active:bg-gray-700',
    ghost: 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Laddar...</span>
        </span>
      ) : children}
    </button>
  )
}

export default function MainContent({ activeSection, setActiveSection }: MainContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [downloadLoading, setDownloadLoading] = useState<'ios' | 'android' | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }, [])

  const handleDownload = useCallback((platform: 'ios' | 'android') => {
    setDownloadLoading(platform)
    setTimeout(() => {
      setDownloadLoading(null)
      showToast(`${platform === 'ios' ? 'App Store' : 'Google Play'} öppnas i ny flik`, 'success')
      // In real app, would redirect to store
    }, 1500)
  }, [showToast])

  // Back button for sub-pages
  const BackButton = ({ to, label }: { to: string; label: string }) => (
    <button
      onClick={() => setActiveSection(to)}
      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 mb-6 group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
      Tillbaka till {label}
    </button>
  )

  // Card with hover effect
  const HoverCard = ({ children, onClick, colorClass = 'blue' }: { children: React.ReactNode; onClick?: () => void; colorClass?: string }) => {
    const colorMap: Record<string, string> = {
      blue: 'hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
      red: 'hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50/50 dark:hover:bg-red-950/20',
      green: 'hover:border-green-300 dark:hover:border-green-800 hover:bg-green-50/50 dark:hover:bg-green-950/20',
      purple: 'hover:border-purple-300 dark:hover:border-purple-800 hover:bg-purple-50/50 dark:hover:bg-purple-950/20',
    }
    
    return (
      <div
        onClick={onClick}
        className={`p-6 rounded-xl border border-gray-200 dark:border-gray-800 ${colorMap[colorClass]} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer`}
      >
        {children}
      </div>
    )
  }

  // HOME SECTION
  if (activeSection === 'home') {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {/* Alert Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">En verklighet vi måste prata om</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              De flesta föräldrar vet inte vad deras barn gör online
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Rekrytering till gängkriminalitet sker via Discord och Roblox. Predatörer använder spel för att kontakta barn. Det är ingen skrämseltaktik – det är vardagen för tusentals familjer i Sverige.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">73%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">av föräldrar övervakar inte barns aktivitet online</div>
            </div>
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">+200%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">ökning i gängrekrytering via appar</div>
            </div>
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">barn möter farligt innehåll varje månad</div>
            </div>
          </div>

          {/* Solution Box */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-transparent rounded-2xl border border-blue-200 dark:border-blue-900 p-8 md:p-10">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ENOUGH är inte spionage. Det är omtanke.
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Vi ger föräldrar verktyg att förstå utan att invadera privatliv. Appen lyssnar <strong>bara</strong> när något potentiellt farligt detekteras – aldrig konstant. Du kan rapportera hot direkt till plattformarna, spara bevis och agera snabbt.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveSection('risks')}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50/50 dark:hover:bg-red-950/20 text-left transition-all duration-300 ease-out group hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Vilka risker finns?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Se vilka hot dina barn möter online</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </button>

            <button
              onClick={() => setActiveSection('how')}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-left transition-all duration-300 ease-out group hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Hur fungerar ENOUGH?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Smart AI, ingen konstant övervakning</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </button>

            <button
              onClick={() => setActiveSection('actions')}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-800 hover:bg-green-50/50 dark:hover:bg-green-950/20 text-left transition-all duration-300 ease-out group hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Vad kan du göra?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rapportera, spara bevis, agera direkt</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </button>

            <button
              onClick={() => setActiveSection('faq')}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-800 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 text-left transition-all duration-300 ease-out group hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Vanliga frågor</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Svar på allt du undrar</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </button>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <ActionButton
              onClick={() => setActiveSection('download')}
              variant="primary"
              className="px-8 py-4 rounded-xl text-lg"
            >
              Ladda ner ENOUGH gratis
            </ActionButton>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">Tillgänglig för Windows. iOS och Android kommer snart.</p>
          </div>
        </div>

        {/* Toast */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    )
  }

  // RISKS SECTION
  if (activeSection === 'risks') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <BackButton to="home" label="Hem" />
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Faktiska hot dina barn möter online
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Detta händer just nu, i appar och spel som ditt barn använder dagligen.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
              <div className="flex items-start gap-4">
                <Smartphone className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Gängrekrytering via Discord och Roblox</h3>
                  <p className="text-gray-700 dark:text-gray-300">Organiserade kriminella grupper rekryterar barn genom spel och chatt-appar. De lockar med pengar, status och gemenskap. Vår AI är tränad att känna igen dessa mönster.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Predatörer och grooming</h3>
                  <p className="text-gray-700 dark:text-gray-300">Vuxna som utger sig för att vara barn för att bygga förtroende. De arbetar metodiskt över veckor innan de ber om bilder eller möten.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900">
              <div className="flex items-start gap-4">
                <Share2 className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Sextortion och utpressning</h3>
                  <p className="text-gray-700 dark:text-gray-300">Barn lockas att skicka privata bilder, sedan utpressas de med hot om att bilderna sprids till vänner och familj.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-900">
              <div className="flex items-start gap-4">
                <Volume2 className="w-6 h-6 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Trakasserier och nätmobbning</h3>
                  <p className="text-gray-700 dark:text-gray-300">Upprepade hot, förnedringar och social isolering online som kan leda till depression, ångest och självskadebeteende.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setActiveSection('how')}
              className="flex-1 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Hur skyddar ENOUGH?
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // HOW IT WORKS SECTION
  if (activeSection === 'how') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <BackButton to="home" label="Hem" />
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Så fungerar ENOUGH
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Smart AI-detektion utan konstant övervakning. Vi respekterar både barnets integritet och din rätt att skydda dem.
            </p>
          </div>

          {/* Key Point */}
          <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">ENOUGH lyssnar INTE konstant</h3>
                <p className="text-gray-700 dark:text-gray-300">Appen aktiveras bara när AI:n detekterar något som potentiellt kan vara farligt. Resten av tiden är den inaktiv. Ditt barns vanliga konversationer förblir privata.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 border-l-blue-600">
              <div className="flex gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">AI tränad på verkliga hot</h3>
                  <p className="text-gray-700 dark:text-gray-300">Vår AI är tränad på tusentals dokumenterade fall av gängrekrytering, grooming, trakasserier och utpressning för att känna igen mönster.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 border-l-blue-600">
              <div className="flex gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Automatisk sparning av bevis</h3>
                  <p className="text-gray-700 dark:text-gray-300">När något farligt detekteras, sparas meddelanden, bilder och transkriberade röstsamtal säkert och datumstämplat.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 border-l-blue-600">
              <div className="flex gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Du får en notifikation</h3>
                  <p className="text-gray-700 dark:text-gray-300">När ett potentiellt hot upptäcks får du en diskret notis med sammanfattning av situationen och rekommenderade åtgärder.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 border-l-blue-600">
              <div className="flex gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Krypterat och säkert</h3>
                  <p className="text-gray-700 dark:text-gray-300">All data är end-to-end-krypterad. ENOUGH kan aldrig se innehållet – bara AI-resultaten. Din familjs integritet är skyddad.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setActiveSection('actions')}
              className="flex-1 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Vad kan du göra?
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ACTIONS SECTION
  if (activeSection === 'actions') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <BackButton to="home" label="Hem" />
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Dina verktyg när något händer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Med ett klick kan du agera direkt och professionellt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-lg transition-all">
              <Share2 className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Rapportera direkt till plattformen</h3>
              <p className="text-gray-700 dark:text-gray-300">En knapp skickar allt bevis direkt till Roblox, Discord, Instagram eller andra plattformar. Ingen manuell utredning behövs.</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-lg transition-all">
              <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Spara och logga allt</h3>
              <p className="text-gray-700 dark:text-gray-300">Transkriberade röstsamtal, screenshots av chattar, alla bevis lagras säkert och datumstämplat för framtida behov.</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-lg transition-all">
              <AlertTriangle className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Agera omedelbart</h3>
              <p className="text-gray-700 dark:text-gray-300">Blockera kontakter, aktivera extra säkerhet, eller kontakta polisen med fullt dokumenterat bevis.</p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-lg transition-all">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Förstå vad som hände</h3>
              <p className="text-gray-700 dark:text-gray-300">Vi förklarar exakt vilken typ av hot det var, vilka tecken som upptäcktes, och nästa steg för att skydda ditt barn.</p>
            </div>
          </div>

          {/* Your responsibility */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-50/50 dark:from-purple-950/30 dark:to-transparent border border-purple-200 dark:border-purple-900">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Din roll som förälder
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex gap-2"><span className="text-purple-600">•</span> Prata öppet med ditt barn om risker online</li>
              <li className="flex gap-2"><span className="text-purple-600">•</span> Sätt gränser respektfullt (ingen telefon under måltider, inte som nattlampa)</li>
              <li className="flex gap-2"><span className="text-purple-600">•</span> Känn till barnets vänner – både online och offline</li>
              <li className="flex gap-2"><span className="text-purple-600">•</span> Agera tillsammans vid hot – stöd, inte straff</li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setActiveSection('download')}
              className="flex-1 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Ladda ner ENOUGH
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // FAQ SECTION
  if (activeSection === 'faq') {
    const faqs = [
      {
        q: 'Lyssnar ENOUGH på allt mitt barn gör?',
        a: 'Nej. ENOUGH lyssnar INTE konstant. AI:n är bara aktiv när den detekterar något som potentiellt kan vara farligt. Vanliga konversationer förblir helt privata.'
      },
      {
        q: 'Hur vet AI:n vad som är farligt?',
        a: 'Vår AI är tränad på tusentals dokumenterade fall av gängrekrytering, grooming, utpressning och nätmobbning. Den känner igen mönster och varningssignaler som människor ofta missar.'
      },
      {
        q: 'Kan mitt barn se att ENOUGH är installerad?',
        a: 'Ja, vi rekommenderar öppenhet. Berätta för ditt barn att appen finns där för deras säkerhet, inte för att kontrollera dem. Transparens bygger förtroende.'
      },
      {
        q: 'Vad händer med sparade bevis?',
        a: 'Alla bevis är end-to-end-krypterade och lagras säkert. Endast du har tillgång. Du kan använda dem för att rapportera till plattformar eller polis vid behov.'
      },
      {
        q: 'Kostar ENOUGH pengar?',
        a: 'Grundversionen är gratis. Premium-funktioner som utökad lagring och prioriterad support finns mot en liten månadsavgift.'
      },
      {
        q: 'Vilka appar och plattformar täcker ENOUGH?',
        a: 'ENOUGH fungerar med de flesta populära appar: Discord, Roblox, Instagram, TikTok, Snapchat, Messenger och fler. Vi lägger kontinuerligt till nya plattformar.'
      },
    ]

    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <BackButton to="home" label="Hem" />
        
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Vanliga frågor
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Svar på det du undrar om ENOUGH.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setActiveSection('download')}
              className="flex-1 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Ladda ner ENOUGH
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // DOWNLOAD SECTION
  if (activeSection === 'download') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <BackButton to="home" label="Hem" />
        
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Ladda ner ENOUGH
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Installera programmet på ditt barns dator för att komma igång.
            </p>
          </div>

          {/* Windows Download - Main CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-2xl bg-blue-600">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">ENOUGH för Windows</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Ladda ner och installera på ditt barns dator</p>
              </div>
              <button 
                onClick={() => showToast('Nedladdningslänk kommer snart!', 'success')}
                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Monitor className="w-6 h-6" />
                Ladda ner för Windows
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-500">Windows 10 eller senare</p>
            </div>
          </div>

          {/* Mobile Apps - Coming Soon */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">Mobilappar kommer snart</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-3 opacity-60">
                <Apple className="w-6 h-6 text-gray-500" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Kommer snart</div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">App Store</div>
                </div>
              </div>
              <div className="px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center gap-3 opacity-60">
                <Play className="w-6 h-6 text-gray-500" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Kommer snart</div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">Google Play</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 text-green-600" />
                Gratis att börja
              </span>
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Lock className="w-4 h-4 text-green-600" />
                GDPR-kompatibel
              </span>
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4 text-green-600" />
                Ingen konstant övervakning
              </span>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    )
  }

  // Fallback
  return null
}
