import '@/styles/globals.scss'
import BaseLayout from '@/layouts/common/base-layout'
import { TPropsChildren } from '@/types/props-children.type'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FM',
  description: 'Football Manager',
}

interface IRootLayoutProps extends TPropsChildren {}

export default function RootLayout({
  children,
}: IRootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseLayout>
          {children}
        </BaseLayout>
      </body>
    </html>
  )
}
