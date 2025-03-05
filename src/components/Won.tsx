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
          heading:
            'Your gambling has destroyed the habitat of the dumbo octopus',
        }
      case 'co2':
        return {
          image: `/assets/slots/co2.png`,
          heading:
            'Your gambling has disturbed carbon stores in the deep ocean',
        }
      case 'fish':
        return {
          image: `/assets/slots/fish.png`,
          heading: 'Your gambling has polluted important fishing grounds',
        }
      case 'whale':
        return {
          image: `/assets/slots/whale.png`,
          heading: 'Your gambling has scared away the whales',
        }
      default:
        return {
          image: `/assets/slots/star.png`,
          heading: 'Your gambling has wiped out a colony of starfish',
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
        src="/assets/congratulations.svg"
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
          Don{"'"}t gamble the ocean floor away! By opposing the deep sea mining
          industry, you can ensure the oceans remain safe for all
        </p>
      </div>
      <div className={styles.btns}>
        <a href="#" onClick={() => onPlayAgain()}>
          <Image
            height={162}
            width={450}
            src="/assets/playBtnEng.png"
            alt="play button"
            quality={100}
          />
        </a>
      </div>
    </div>
  )
}
