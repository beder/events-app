import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { type Metadata } from 'next'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: {
    template: '%s - Evenia',
    default: 'Evenia - Event management made easy',
  },
  description:
    'Evenia is the best way to manage your events. Spend less time on paperwork and more time on your event.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <ClerkProvider>
        <body className="flex h-full flex-col">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  )
}
