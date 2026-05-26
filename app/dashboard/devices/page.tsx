'use client'

import { useState } from 'react'
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Plus, 
  MoreVertical,
  Trash2,
  Settings,
  RefreshCw,
  AlertTriangle,
  Check,
  X,
  Laptop
} from 'lucide-react'
import { mockDevices, formatRelativeTime, type Device } from '@/lib/mock-data'

const deviceIcons: Record<string, React.ElementType> = {
  windows: Laptop,
  mac: Laptop,
  android: Smartphone,
  ios: Tablet
}

const deviceTypeLabels: Record<string, string> = {
  windows: 'Windows',
  mac: 'macOS',
  android: 'Android',
  ios: 'iOS'
}

function DeviceCard({ 
  device, 
  onAction 
}: { 
  device: Device
  onAction: (action: string, deviceId: string) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const Icon = deviceIcons[device.type] || Monitor

  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Online', textColor: 'text-green-600 dark:text-green-400' },
    offline: { color: 'bg-gray-400', label: 'Offline', textColor: 'text-gray-600 dark:text-gray-400' },
    syncing: { color: 'bg-blue-500 animate-pulse', label: 'Synkroniserar...', textColor: 'text-blue-600 dark:text-blue-400' }
  }

  const status = statusConfig[device.status]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
            <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{device.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{device.childName} • {deviceTypeLabels[device.type]}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => { onAction('sync', device.id); setShowMenu(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Synkronisera</span>
                </button>
                <button
                  onClick={() => { onAction('settings', device.id); setShowMenu(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Inställningar</span>
                </button>
                <div className="border-t border-gray-100 dark:border-gray-800" />
                <button
                  onClick={() => { onAction('remove', device.id); setShowMenu(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600 dark:text-red-400">Ta bort enhet</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
            <span className={`text-sm font-medium ${status.textColor}`}>{status.label}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hot denna vecka</p>
          <p className={`text-lg font-bold mt-1 ${device.threatsThisWeek > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
            {device.threatsThisWeek}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Senast sedd</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{formatRelativeTime(device.lastSeen)}</p>
        </div>
      </div>

      {device.threatsThisWeek > 0 && (
        <div className="mt-4 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
          <p className="text-sm text-orange-700 dark:text-orange-300">
            {device.threatsThisWeek} hot detekterade denna vecka
          </p>
        </div>
      )}
    </div>
  )
}

export default function DevicesPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const handleAction = (action: string, deviceId: string) => {
    const messages: Record<string, string> = {
      sync: 'Synkronisering startad',
      settings: 'Öppnar enhetsinställningar...',
      remove: 'Enhet borttagen'
    }
    
    setToast({ message: messages[action] || 'Åtgärd utförd', type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  const onlineCount = mockDevices.filter(d => d.status === 'online').length

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Enheter</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {onlineCount} av {mockDevices.length} enheter online
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Lägg till enhet
        </button>
      </div>

      {/* Devices grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onAction={handleAction}
          />
        ))}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md p-6 animate-in zoom-in-95 fade-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lägg till enhet</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              För att lägga till en ny enhet, ladda ner och installera ENOUGH-klienten på barnets dator eller enhet.
            </p>

            <div className="space-y-3">
              <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                  <Laptop className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Windows</p>
                  <p className="text-sm text-gray-500">Ladda ner för Windows 10+</p>
                </div>
              </button>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 opacity-60">
                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-500">Android / iOS</p>
                  <p className="text-sm text-gray-400">Kommer snart</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}

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
