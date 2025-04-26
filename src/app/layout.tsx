import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RecipeHUB',
  description: 'Your all-in-one fitness, health, and nutrition meal planning platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 min-h-screen'}>{children}</body>
    </html>
  )
}
