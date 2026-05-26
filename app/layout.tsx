import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  weight: ['400', '500', '600', '700']
});

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'ENOUGH - Skydda dina barn online',
  description: 'ENOUGH är en barnskyddsapp som hjälper föräldrar att skydda sina barn online med smart AI-detektion utan konstant övervakning.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ENOUGH',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${instrumentSans.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased bg-background">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
