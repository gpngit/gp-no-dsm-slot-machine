import SlotMachine from '@/components/SlotMachine'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <header id="header">
        <Image
          src="/assets/dsb-logo.png"
          alt="Deep sea betting logo"
          width="591"
          height="319"
          layout="responsive"
          priority
        />
      </header>
      <SlotMachine />
    </main>
  )
}
