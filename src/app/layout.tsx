import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import './globals.css'
import styles from './page.module.css'

const worksans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' })
const wimp = localFont({
  src: './wimp.woff2',
  variable: '--font-wimp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Deep Sea Betting',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${worksans.variable} ${wimp.variable}`}>
      <body>
        <Image
          fill
          quality={90}
          src="/assets/bg-desktop.png"
          alt="Background"
          objectFit="cover"
          priority
          sizes="100vw"
        />
        <div className="greenpeace">
          <Image
            src="/assets/greenpeace.png"
            alt="Greenpeace"
            priority
            quality={100}
            width={200}
            height={33}
          />
        </div>
        {children}
      </body>
    </html>
  )
}
