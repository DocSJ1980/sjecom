import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from '@/providers/modal-providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'sjEcom - Admin Dashboard',
  description: 'sjEcom - Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}
          <ModalProvider />
        </body>
      </html>
    </ClerkProvider>
  )
}
