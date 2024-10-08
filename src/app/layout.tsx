import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Jomhuria, Work_Sans } from 'next/font/google'
import Image from 'next/image'
import './globals.css'

const worksans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' })
const jomhuria = Jomhuria({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jomhuria',
})

export const metadata: Metadata = {
  title: 'Deep Sea Betting',
  description:
    'Visste du at Norge vil starte gruvedrift på havbunnen i sårbare Arktis? Dette er gambling med naturen, og vi har alt å tape.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${worksans.variable} ${jomhuria.variable}`}>
      <GoogleTagManager gtmId="GTM-W3S57FK" />
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
        <div className="bg-overlay" id="bg-overlay"></div>
        <div className="greenpeace">
          <Image
            src="/assets/greenpeace.png"
            alt="Greenpeace"
            priority
            quality={100}
            width={352}
            height={58}
          />
        </div>
        {children}
      </body>
    </html>
  )
}
