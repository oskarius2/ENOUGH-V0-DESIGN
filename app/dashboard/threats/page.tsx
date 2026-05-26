'use client'

import { useState } from 'react'
import { 
  AlertTriangle, 
  Filter, 
  Search, 
  Check, 
  Shield, 
  Archive, 
  Eye,
  ChevronDown,
  X,
  ExternalLink,
  MessageSquare,
  Volume2,
  Copy,
  Flag
} from 'lucide-react'
import { 
  mockThreats, 
  threatLevelColors, 
  threatLevelBarColors,
  formatRelativeTime,
  type Threat
} from '@/lib/mock-data'

// Filter options
const statusFilters = [
  { value: 'all', label: 'Alla' },
  { value: 'new', label: 'Nya' },
  { value: 'reviewed', label: 'Granskade' },
  { value: 'confirmed', label: 'Bekräftade' },
  { value: 'marked_safe', label: 'Säkra' },
  { value: 'archived', label: 'Arkiverade' },
]

const levelFilters = [
  { value: 0, label: 'Alla nivåer' },
  { value: 5, label: 'Nivå 5 - Kritisk' },
  { value: 4, label: 'Nivå 4 - Hög' },
  { value: 3, label: 'Nivå 3 - Medel' },
  { value: 2, label: 'Nivå 2 - Medel-låg' },
  { value: 1, label: 'Nivå 1 - Låg' },
]

// Threat Card Component
function ThreatCard({ 
  threat, 
  isExpanded, 
  onToggle,
  onAction
}: { 
  threat: Threat
  isExpanded: boolean
  onToggle: () => void
  onAction: (action: string) => void
}) {
  const levelStyle = threatLevelColors[threat.level]
  const barColor = threatLevelBarColors[threat.level]

  return (
    <div 
      className={`bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-300 ${
        isExpanded 
          ? 'border-blue-300 dark:border-blue-700 shadow-lg' 
          : 'border-gray-200 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        {/* Level bar */}
        <div className={`w-1.5 h-16 rounded-full ${barColor} flex-shrink-0`} />
        
        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${levelStyle.bg} ${levelStyle.text}`}>
              Nivå {threat.level}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{threat.category}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{threat.platform}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{threat.transcript}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span>{threat.deviceName}</span>
            <span>•</span>
            <span>{formatRelativeTime(threat.timestamp)}</span>
          </div>
        </div>

        {/* Status & expand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {threat.status === 'new' && (
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          )}
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 duration-200">
          <div className="pt-4 space-y-4">
            {/* Reasoning */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">AI-analys</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{threat.reasoning}</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-xs text-gray-500">Konfidens: <strong className="text-gray-700 dark:text-gray-300">{Math.round(threat.confidence * 100)}%</strong></span>
                <span className="text-xs text-gray-500">Språk: <strong className="text-gray-700 dark:text-gray-300">{threat.language.toUpperCase()}</strong></span>
              </div>
            </div>

            {/* Transcript */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {threat.context.toLowerCase().includes('voice') ? (
                  <Volume2 className="w-4 h-4 text-gray-400" />
                ) : (
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                )}
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {threat.context.toLowerCase().includes('voice') ? 'Transkription' : 'Meddelande'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">&quot;{threat.transcript}&quot;</p>
                <p className="text-xs text-gray-400 mt-2">— {threat.speaker}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => onAction('confirm')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-medium"
              >
                <Flag className="w-4 h-4" />
                Bekräfta hot
              </button>
              <button
                onClick={() => onAction('safe')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm font-medium"
              >
                <Check className="w-4 h-4" />
                Markera säker
              </button>
              <button
                onClick={() => onAction('archive')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                <Archive className="w-4 h-4" />
                Arkivera
              </button>
              <button
                onClick={() => onAction('report')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Rapportera till {threat.platform}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(threat.transcript)
                  onAction('copy')
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                <Copy className="w-4 h-4" />
                Kopiera
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ThreatsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState(0)
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Filter threats
  const filteredThreats = mockThreats.filter(threat => {
    if (statusFilter !== 'all' && threat.status !== statusFilter) return false
    if (levelFilter > 0 && threat.level !== levelFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        threat.transcript.toLowerCase().includes(query) ||
        threat.category.toLowerCase().includes(query) ||
        threat.platform.toLowerCase().includes(query) ||
        threat.deviceName.toLowerCase().includes(query)
      )
    }
    return true
  })

  const handleAction = (threatId: string, action: string) => {
    // In real app, this would call API
    const messages: Record<string, string> = {
      confirm: 'Hot markerat som bekräftat',
      safe: 'Markerat som säkert',
      archive: 'Hot arkiverat',
      report: 'Öppnar rapportformulär...',
      copy: 'Kopierat till urklipp'
    }
    
    setToast({ message: messages[action] || 'Åtgärd utförd', type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  const newThreatsCount = mockThreats.filter(t => t.status === 'new').length

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hot</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {newThreatsCount} nya hot att granska
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
              showFilters || statusFilter !== 'all' || levelFilter > 0
                ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400'
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filter
            {(statusFilter !== 'all' || levelFilter > 0) && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {(statusFilter !== 'all' ? 1 : 0) + (levelFilter > 0 ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sök i hot, plattformar, enheter..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter dropdowns */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-2 duration-200">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Nivå</label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(Number(e.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {levelFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
            {(statusFilter !== 'all' || levelFilter > 0) && (
              <button
                onClick={() => {
                  setStatusFilter('all')
                  setLevelFilter(0)
                }}
                className="self-end px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Rensa filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Threats list */}
      <div className="space-y-4">
        {filteredThreats.length > 0 ? (
          filteredThreats.map((threat) => (
            <ThreatCard
              key={threat.id}
              threat={threat}
              isExpanded={expandedThreat === threat.id}
              onToggle={() => setExpandedThreat(expandedThreat === threat.id ? null : threat.id)}
              onAction={(action) => handleAction(threat.id, action)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Inga hot att visa</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery || statusFilter !== 'all' || levelFilter > 0
                ? 'Inga hot matchade dina filter.'
                : 'Alla hot har granskats. Bra jobbat!'
              }
            </p>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          <Check className="w-5 h-5" />
          <span className="font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80 transition">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
