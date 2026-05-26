// Mock data for the dashboard
// Will be replaced with real API calls later

export interface Threat {
  id: string
  transcript_hash: string
  level: 1 | 2 | 3 | 4 | 5
  category: string
  speaker: string
  platform: string
  reasoning: string
  confidence: number
  language: string
  context: string
  transcript: string
  timestamp: string
  status: 'new' | 'reviewed' | 'marked_safe' | 'archived' | 'confirmed' | 'false_positive'
  deviceId: string
  deviceName: string
}

export interface Device {
  id: string
  name: string
  type: 'windows' | 'mac' | 'android' | 'ios'
  status: 'online' | 'offline' | 'syncing'
  lastSeen: string
  threatsThisWeek: number
  childName: string
}

export interface DashboardStats {
  devicesMonitored: number
  threatsThisWeek: number
  safetyScore: number
  lastActivity: string
}

// Threat level colors
export const threatLevelColors: Record<number, { bg: string; text: string; border: string; label: string }> = {
  1: { bg: 'bg-green-100 dark:bg-green-950/50', text: 'text-green-700 dark:text-green-400', border: 'border-green-300 dark:border-green-800', label: 'Låg' },
  2: { bg: 'bg-cyan-100 dark:bg-cyan-950/50', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-300 dark:border-cyan-800', label: 'Medel-låg' },
  3: { bg: 'bg-yellow-100 dark:bg-yellow-950/50', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-300 dark:border-yellow-800', label: 'Medel' },
  4: { bg: 'bg-orange-100 dark:bg-orange-950/50', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-300 dark:border-orange-800', label: 'Hög' },
  5: { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-400', border: 'border-red-300 dark:border-red-800', label: 'Kritisk' },
}

export const threatLevelBarColors: Record<number, string> = {
  1: 'bg-green-500',
  2: 'bg-cyan-500',
  3: 'bg-yellow-500',
  4: 'bg-orange-500',
  5: 'bg-red-500',
}

// Mock threats
export const mockThreats: Threat[] = [
  {
    id: '1',
    transcript_hash: 'abc123',
    level: 4,
    category: 'Rekrytering',
    speaker: 'Okänd användare',
    platform: 'Discord',
    reasoning: 'Användaren försöker rekrytera till kriminell verksamhet genom löften om snabba pengar.',
    confidence: 0.89,
    language: 'sv',
    context: 'Voice chat i Discord-server för gamers',
    transcript: 'Yo, vill du tjäna lite extra cash? Jag har en grej på gång, lätt pengar. Behöver någon som kan hjälpa till med en delivery. Inga frågor, bara pengar.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
    status: 'new',
    deviceId: '1',
    deviceName: 'Emmas dator'
  },
  {
    id: '2',
    transcript_hash: 'def456',
    level: 3,
    category: 'Grooming',
    speaker: 'GamerPro2000',
    platform: 'Roblox',
    reasoning: 'Användaren försöker etablera en personlig relation och frågar efter privat information.',
    confidence: 0.75,
    language: 'sv',
    context: 'Privat meddelande i Roblox',
    transcript: 'Du verkar cool, hur gammal är du egentligen? Vi borde snacka mer privat, har du Snap eller Insta?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: 'new',
    deviceId: '2',
    deviceName: 'Oscars surfplatta'
  },
  {
    id: '3',
    transcript_hash: 'ghi789',
    level: 2,
    category: 'Mobbning',
    speaker: 'Klasskompis',
    platform: 'Instagram',
    reasoning: 'Potentiellt nedlåtande kommentar som kan vara del av ett mönster.',
    confidence: 0.62,
    language: 'sv',
    context: 'Kommentar på Instagram-inlägg',
    transcript: 'Haha vad har du på dig, ser ut som en clown',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    status: 'reviewed',
    deviceId: '1',
    deviceName: 'Emmas dator'
  },
  {
    id: '4',
    transcript_hash: 'jkl012',
    level: 5,
    category: 'Utpressning',
    speaker: 'Anonym',
    platform: 'Snapchat',
    reasoning: 'Direkt hot om att sprida privata bilder om inte krav uppfylls.',
    confidence: 0.95,
    language: 'sv',
    context: 'Snapchat DM',
    transcript: 'Jag har screenshots på allt. Skicka pengar annars sprider jag det till alla dina vänner och familj.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    status: 'confirmed',
    deviceId: '1',
    deviceName: 'Emmas dator'
  },
  {
    id: '5',
    transcript_hash: 'mno345',
    level: 1,
    category: 'Olämpligt språk',
    speaker: 'Vän',
    platform: 'Fortnite',
    reasoning: 'Svordomar och grovt språk i konversation, men ingen hotfull kontext.',
    confidence: 0.55,
    language: 'sv',
    context: 'Voice chat under Fortnite-spel',
    transcript: 'Fan vad du suger, kan du inte sikta bättre eller?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    status: 'marked_safe',
    deviceId: '2',
    deviceName: 'Oscars surfplatta'
  }
]

// Mock devices
export const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Emmas dator',
    type: 'windows',
    status: 'online',
    lastSeen: new Date().toISOString(),
    threatsThisWeek: 3,
    childName: 'Emma'
  },
  {
    id: '2',
    name: 'Oscars surfplatta',
    type: 'android',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    threatsThisWeek: 2,
    childName: 'Oscar'
  },
  {
    id: '3',
    name: 'Familjens iPad',
    type: 'ios',
    status: 'syncing',
    lastSeen: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    threatsThisWeek: 0,
    childName: 'Delad'
  }
]

// Mock stats
export const mockStats: DashboardStats = {
  devicesMonitored: 3,
  threatsThisWeek: 5,
  safetyScore: 78,
  lastActivity: new Date(Date.now() - 1000 * 60 * 15).toISOString()
}

// Weekly threat data for chart
export const weeklyThreatData = [
  { day: 'Mån', threats: 2, level1: 1, level2: 0, level3: 1, level4: 0, level5: 0 },
  { day: 'Tis', threats: 1, level1: 0, level2: 1, level3: 0, level4: 0, level5: 0 },
  { day: 'Ons', threats: 3, level1: 1, level2: 1, level3: 1, level4: 0, level5: 0 },
  { day: 'Tor', threats: 0, level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 },
  { day: 'Fre', threats: 4, level1: 1, level2: 1, level3: 1, level4: 1, level5: 0 },
  { day: 'Lör', threats: 2, level1: 0, level2: 1, level3: 0, level4: 0, level5: 1 },
  { day: 'Sön', threats: 1, level1: 0, level2: 0, level3: 1, level4: 0, level5: 0 },
]

// Threat level distribution for doughnut chart
export const threatLevelDistribution = [
  { level: 1, count: 3, label: 'Nivå 1', color: '#22c55e' },
  { level: 2, count: 4, label: 'Nivå 2', color: '#06b6d4' },
  { level: 3, count: 4, label: 'Nivå 3', color: '#eab308' },
  { level: 4, count: 1, label: 'Nivå 4', color: '#f97316' },
  { level: 5, count: 1, label: 'Nivå 5', color: '#ef4444' },
]

// Helper to format relative time
export function formatRelativeTime(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just nu'
  if (diffMins < 60) return `${diffMins} min sedan`
  if (diffHours < 24) return `${diffHours} tim sedan`
  if (diffDays < 7) return `${diffDays} dag${diffDays > 1 ? 'ar' : ''} sedan`
  
  return date.toLocaleDateString('sv-SE')
}
