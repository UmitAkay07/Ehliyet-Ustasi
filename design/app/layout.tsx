import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Ehliyet Ustası - Ehliyet Sınavına Hazırlık',
  description:
    'Ehliyet sınavına eğlenceli ve etkili şekilde hazırlan. Testler, dersler ve direksiyon simülasyonu ile ehliyetini kolayca al!',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#5b5bd6',
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
    <html lang="tr" className={`${nunito.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
