'use client'

import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  ChevronRight
} from 'lucide-react'
import { mockThreats, mockDevices } from '@/lib/mock-data'

// Mock report data
const weeklyReports = [
  {
    id: '1',
    week: 'Vecka 22, 2024',
    dateRange: '27 maj - 2 juni',
    totalThreats: 13,
    criticalThreats: 2,
    safetyScore: 78,
    trend: 'down' as const,
    trendValue: 15
  },
  {
    id: '2',
    week: 'Vecka 21, 2024',
    dateRange: '20 - 26 maj',
    totalThreats: 8,
    criticalThreats: 1,
    safetyScore: 85,
    trend: 'up' as const,
    trendValue: 5
  },
  {
    id: '3',
    week: 'Vecka 20, 2024',
    dateRange: '13 - 19 maj',
    totalThreats: 6,
    criticalThreats: 0,
    safetyScore: 92,
    trend: 'up' as const,
    trendValue: 8
  }
]

function ReportCard({ report }: { report: typeof weeklyReports[0] }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{report.week}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{report.dateRange}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          report.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {report.trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {report.trendValue}%
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hot totalt</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{report.totalThreats}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kritiska</p>
          <p className={`text-2xl font-bold mt-1 ${report.criticalThreats > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {report.criticalThreats}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Säkerhetspoäng</p>
          <p className={`text-2xl font-bold mt-1 ${
            report.safetyScore >= 80 ? 'text-green-600' : report.safetyScore >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {report.safetyScore}%
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
          <FileText className="w-4 h-4" />
          Visa rapport
        </button>
        <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default function ReportsPage() {
  const totalThreatsAllTime = mockThreats.length
  const criticalThreats = mockThreats.filter(t => t.level >= 4).length
  const resolvedThreats = mockThreats.filter(t => ['marked_safe', 'archived', 'confirmed'].includes(t.status)).length

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rapporter</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Veckovisa sammanfattningar och statistik</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Calendar className="w-5 h-5" />
          Välj period
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalThreatsAllTime}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hot totalt</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{criticalThreats}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Kritiska hot</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{resolvedThreats}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hanterade hot</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly reports */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Veckorapporter</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {weeklyReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* Per device breakdown */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Per enhet</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Hot fördelat per enhet denna månad</p>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {mockDevices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{device.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{device.childName}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`font-bold ${device.threatsThisWeek > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {device.threatsThisWeek} hot
                  </p>
                  <p className="text-xs text-gray-400">denna vecka</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
