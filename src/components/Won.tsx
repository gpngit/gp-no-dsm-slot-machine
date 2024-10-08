import Image from 'next/image'
import { FC, useMemo } from 'react'
import { SLOT_TYPES } from './SlotMachine'
import styles from './won.module.css'

import penger1 from '/public/assets/penger1.svg'

export const Won: FC<{
  onPlayAgain: () => void
  slotType: (typeof SLOT_TYPES)[number]
}> = ({ onPlayAgain, slotType = 'star' }) => {
  const { image, heading } = useMemo(() => {
    switch (slotType) {
      case 'anemone':
        return {
          image: `/assets/slots/anemone.png`,
          heading: 'Du har utryddet en unik dypvannsart',
        }
      case 'dumbo':
        return {
          image: `/assets/slots/dumbo.png`,
          heading: 'Du har ødelagt habitatet til dumboblekkspruten',
        }
      case 'co2':
        return {
          image: `/assets/slots/co2.png`,
          heading: 'Du har frigjort store mengder CO2 og forsuret havet',
        }
      case 'fish':
        return {
          image: `/assets/slots/fish.png`,
          heading: 'Du har ødelagt oppvekstområdet til en viktig fiskebestand',
        }
      case 'whale':
        return {
          image: `/assets/slots/whale.png`,
          heading: 'Du har fordrevet den sjeldne nebbhvalen',
        }
      default:
        return {
          image: `/assets/slots/star.png`,
          heading: 'Du har utslettet en koloni av sjøstjerner',
        }
    }
  }, [slotType])

  return (
    <div className={styles.wrapper}>
      <div className={styles.slots}>
        <Image src={image} width="150" height="150" alt="Star" quality={100} />
        <Image src={image} width="150" height="150" alt="Star" quality={100} />
        <Image src={image} width="150" height="150" alt="Star" quality={100} />
      </div>
      <Image
        src="/assets/congrats.svg"
        width="800"
        height="133"
        alt="You won!"
        quality={100}
        className={styles.congrats}
        priority
      />
      <div className={styles.pengerMobile}></div>
      <Image
        src={penger1}
        alt="You won!"
        width="250"
        height="250"
        quality={100}
        className={styles.penger1}
        priority
      />
      <Image
        src="/assets/penger2.svg"
        width="200"
        height="200"
        alt="You won!"
        quality={100}
        className={styles.penger2}
        priority
      />
      <Image
        src="/assets/penger3.svg"
        width="250"
        height="250"
        alt="You won!"
        quality={100}
        className={styles.penger3}
        priority
      />
      <Image
        src="/assets/penger4.svg"
        width="200"
        height="200"
        alt="You won!"
        quality={100}
        className={styles.penger4}
        priority
      />
      <div className={styles.intro}>
        <p>{heading}</p>
      </div>
      <div className={styles.body}>
        <p>
          Fortsett å gamble med livet på havbunnen, så kanskje du ødelegger enda
          mer av havet! Eller stopp det farlige spillet ved å signere oppropet.
        </p>
      </div>
      <div className={styles.btns}>
        <a href="#" onClick={() => onPlayAgain()}>
          <Image
            height={64}
            width={194}
            src="/assets/playAgainBtn.png"
            alt="play button"
          />
        </a>
        <a
          href="https://www.greenpeace.org/norway/vaer-med/stopp-gruvedrift-pa-havbunnen/?utm_medium=referral&utm_source=deepseabetting&utm_campaign=no_pg_oceans&utm_content=no_pg_dsm&utm_term=none_none_none_slot-machine-site-after-game"
          target="_blank"
        >
          <Image
            height={64}
            width={284}
            src="/assets/signBtn.png"
            alt="play button"
          />
        </a>
      </div>
    </div>
  )
}
