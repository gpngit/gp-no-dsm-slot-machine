import Image from 'next/image'
import { FC, useMemo } from 'react'
import { Button } from './Button'
import { SLOT_TYPES } from './SlotMachine'
import styles from './won.module.css'

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
        <Image src={image} width="180" height="180" alt="Star" quality={100} />
        <Image src={image} width="180" height="180" alt="Star" quality={100} />
        <Image src={image} width="180" height="180" alt="Star" quality={100} />
      </div>
      <Image
        src="/assets/congrats.png"
        width="800"
        height="133"
        alt="You won!"
        quality={100}
        className={styles.congrats}
      />
      <div className={styles.intro}>
        <p>{heading}</p>
      </div>
      <div className={styles.body}>
        <p>
          Fortsett å gamble med livet på havbunnen, så kanskje du ødelegger enda
          mer av det maritime økosystemet!
        </p>
      </div>
      <div className={styles.btns}>
        <Button onClick={() => onPlayAgain()}>Spill igjen</Button>
        <Button
          as={'a'}
          // Cant be bothered typing this...
          // @ts-ignore
          href="https://www.greenpeace.org/norway/vaer-med/stopp-gruvedrift-pa-havbunnen/"
          // @ts-ignore
          target="_blank"
        >
          Signer oppropet
        </Button>
      </div>
    </div>
  )
}
