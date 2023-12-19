import type { Metadata } from 'next'
import { Montserrat} from 'next/font/google'
import './styleProfile.css'

const montserrat= Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Профиль',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
