'use client'

import { Monitor, AlertTriangle, Shield, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import { 
  mockStats, 
  mockThreats, 
  mockDevices, 
  weeklyThreatData, 
  threatLevelDistribution,
  formatRelativeTime,
  threatLevelColors,
  threatLevelBarColors
} from '@/lib/mock-data'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import Link from 'next/link'

// Metric Card component
function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  color = 'blue'
}: { 
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
  trend?: { value: number; positive: boolean }
  color?: 'blue' | 'red' | 'green' | 'yellow'
}) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
    red: 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400',
    green: 'bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400',
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
            {trend.value}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{title}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  )
}

// Recent threat item
function RecentThreatItem({ threat }: { threat: typeof mockThreats[0] }) {
  const levelStyle = threatLevelColors[threat.level]
  const barColor = threatLevelBarColors[threat.level]

  return (
    <Link
      href={`/dashboard/threats/${threat.id}`}
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
    >
      <div className={`w-1.5 h-12 rounded-full ${barColor}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelStyle.bg} ${levelStyle.text}`}>
            Nivå {threat.level}
          </span>
          <span className="text-xs text-gray-400">{threat.platform}</span>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1 truncate">{threat.category}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{threat.transcript.substring(0, 50)}...</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs text-gray-400">{formatRelativeTime(threat.timestamp)}</p>
        <p className="text-xs text-gray-500 mt-1">{threat.deviceName}</p>
      </div>
    </Link>
  )
}

// Device status item
function DeviceStatusItem({ device }: { device: typeof mockDevices[0] }) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    syncing: 'bg-blue-500 animate-pulse'
  }

  const statusLabels = {
    online: 'Online',
    offline: 'Offline',
    syncing: 'Synkar...'
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{device.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{device.childName}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[device.status]}`} />
          <span className="text-xs text-gray-500">{statusLabels[device.status]}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{device.threatsThisWeek} hot denna vecka</p>
      </div>
    </div>
  )
}

export default function OverviewPage() {
  const recentThreats = mockThreats.filter(t => t.status === 'new').slice(0, 5)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Översikt</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Välkommen tillbaka. Här är en sammanfattning av aktiviteten.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Monitor}
          title="Enheter övervakade"
          value={mockStats.devicesMonitored}
          subtitle="Alla enheter aktiva"
          color="blue"
        />
        <MetricCard
          icon={AlertTriangle}
          title="Hot denna vecka"
          value={mockStats.threatsThisWeek}
          subtitle="2 kräver åtgärd"
          color="red"
          trend={{ value: 15, positive: true }}
        />
        <MetricCard
          icon={Shield}
          title="Säkerhetspoäng"
          value={`${mockStats.safetyScore}%`}
          subtitle="Baserat på aktivitet"
          color="green"
          trend={{ value: 5, positive: true }}
        />
        <MetricCard
          icon={Clock}
          title="Senaste aktivitet"
          value={formatRelativeTime(mockStats.lastActivity)}
          subtitle="Emmas dator"
          color="yellow"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Threat Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hot per dag</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Senaste 7 dagarna</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyThreatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Level Distribution */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Fördelning per nivå</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Alla detekterade hot</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatLevelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="label"
                >
                  {threatLevelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Threats */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Senaste hot</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{recentThreats.length} nya hot att granska</p>
            </div>
            <Link 
              href="/dashboard/threats"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Visa alla
            </Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentThreats.length > 0 ? (
              recentThreats.map((threat) => (
                <RecentThreatItem key={threat.id} threat={threat} />
              ))
            ) : (
              <div className="p-8 text-center">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Inga nya hot att visa</p>
              </div>
            )}
          </div>
        </div>

        {/* Device Status */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Enheter</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{mockDevices.filter(d => d.status === 'online').length} av {mockDevices.length} online</p>
            </div>
            <Link 
              href="/dashboard/devices"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Hantera
            </Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockDevices.map((device) => (
              <DeviceStatusItem key={device.id} device={device} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
