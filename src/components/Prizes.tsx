import Image from 'next/image'
import { FC } from 'react'
import styles from './prizes.module.css'

export const Prizes: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.part}>
          <div className={styles.image}>
            <div className={styles.imageInner}>
              <Image
                alt="Fiskeskjelett"
                src={'/assets/slots/fish.png'}
                objectFit="contain"
                className={styles.image}
                fill
              />
            </div>
            <Image
              alt="3x"
              src={'/assets/3x.svg'}
              className={styles.imageTag}
              width={94}
              height={66}
            />
          </div>
          <h3 className={styles.heading}>Fiskeskjelett</h3>
          <p className={styles.content}>Ødelegger viktig fiskebestandområde</p>
        </div>
        <div className={styles.part}>
          <div className={styles.image}>
            <div className={styles.imageInner}>
              <Image
                alt="co2"
                src={'/assets/slots/co2.png'}
                objectFit="contain"
                className={styles.image}
                fill
              />
            </div>
            <Image
              alt="3x"
              src={'/assets/3x.svg'}
              className={styles.imageTag}
              width={94}
              height={66}
            />
          </div>
          <h3 className={styles.heading}>Co2</h3>
          <p className={styles.content}>Forsurer havet</p>
        </div>
        <div className={styles.part}>
          <div className={styles.image}>
            <div className={styles.imageInner}>
              <Image
                alt="co2"
                src={'/assets/slots/star.png'}
                objectFit="contain"
                className={styles.image}
                fill
              />
            </div>
            <Image
              alt="3x"
              src={'/assets/3x.svg'}
              className={styles.imageTag}
              width={94}
              height={66}
            />
          </div>
          <h3 className={styles.heading}>Sjøstjerne</h3>
          <p className={styles.content}>Utsletter en koloni med sjøstjerner</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.part}>
          <div className={styles.image}>
            <div className={styles.imageInner}>
              <Image
                alt="anemone"
                src={'/assets/slots/anemone.png'}
                objectFit="contain"
                className={styles.image}
                fill
              />
            </div>
            <Image
              alt="3x"
              src={'/assets/3x.svg'}
              className={styles.imageTag}
              width={94}
              height={66}
            />
          </div>
          <h3 className={styles.heading}>Anemone</h3>
          <p className={styles.content}>Utrydder unik dypvannsart</p>
        </div>
        <div className={styles.part}>
          <div className={styles.image}>
            <div className={styles.imageInner}>
              <Image
                alt="dumbo"
                src={'/assets/slots/dumbo.png'}
                objectFit="contain"
                className={styles.image}
                fill
              />
            </div>
            <Image
              alt="3x"
              src={'/assets/3x.svg'}
              className={styles.imageTag}
              width={94}
              height={66}
            />
          </div>
          <h3 className={styles.heading}>Dumbo</h3>
          <p className={styles.content}>
            Ødelegger habitatet til dumboblekkspruten
          </p>
        </div>
        <div className={styles.part}>
          <div className={styles.image}>
            <div className={styles.imageInner}>
              <Image
                alt="Nebbhval"
                src={'/assets/slots/whale.png'}
                objectFit="contain"
                className={styles.image}
                fill
              />
            </div>
            <Image
              alt="3x"
              src={'/assets/3x.svg'}
              className={styles.imageTag}
              width={94}
              height={66}
            />
          </div>
          <h3 className={styles.heading}>Nebbhval</h3>
          <p className={styles.content}>Skremmer bort nebbhvalen</p>
        </div>
      </div>
    </div>
  )
}
