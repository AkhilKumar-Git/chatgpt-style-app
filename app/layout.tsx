import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChatGPT Style App',
  description: 'A ChatGPT-style chat application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 