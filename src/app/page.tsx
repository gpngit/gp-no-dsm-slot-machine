import SlotMachine from '@/components/SlotMachine'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <header id="header" className="header-enter">
        <Image
          src="/assets/dsb-logo.png"
          alt="Deep sea betting logo"
          width="591"
          height="319"
          layout="responsive"
          className="header-logo"
          priority
        />
      </header>
      <SlotMachine />
    </main>
  )
}
