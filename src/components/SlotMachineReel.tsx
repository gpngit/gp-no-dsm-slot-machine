'use client'

import { getRandomNumber } from '@/utils/number'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './slotmachine.module.css'
import { SLOT_TYPES } from './SlotMachine'

const SLOTS = 10
const SLOT_HEIGHT = 180
const SLOT_ANGLE = 360 / SLOTS
const REEL_RADIUS = Math.round(SLOT_HEIGHT / 2 / Math.tan(Math.PI / SLOTS))
const SPIN_MAX_DURATION = 3

const imageSize = 200

const SlotMachineReel = ({
  spinning,
  shouldWin,
  winType,
  onComplete,
  id,
}: {
  shouldWin: boolean
  winType: string
  spinning: boolean
  onComplete: (winner: number) => void
  id: string
}) => {
  const [currentAngle, setCurrentAngle] = useState(
    SLOT_ANGLE * getRandomNumber(90, 100)
  )
  const [endSlot, setEndSlot] = useState(getRandomNumber(0, 4))

  useEffect(() => {
    setCurrentAngle(SLOT_ANGLE * getRandomNumber(90, 100))
    setEndSlot(getRandomNumber(0, 5))
  }, [spinning])

  return (
    <div
      className={styles.reel}
      suppressHydrationWarning
      onTransitionEnd={() => onComplete(endSlot)}
      style={{
        transform: spinning ? `rotateX(0deg)` : `rotateX(${currentAngle}deg)`,
        transition: spinning
          ? `transform ${getRandomNumber(
              1,
              SPIN_MAX_DURATION
            )}s cubic-bezier(.17,.67,.07,.97)`
          : 'transform 100ms linear',
      }}
    >
      {Array.from({ length: SLOTS }).map((_, i) => (
        <span
          key={i}
          suppressHydrationWarning
          className={styles.slot}
          style={{
            transform: `rotateX(${
              SLOT_ANGLE * i
            }deg) translateZ(${REEL_RADIUS}px)`,
          }}
        >
          {i !== 0 && (
            <Image
              src={`/assets/slots/${SLOT_TYPES[getRandomNumber(0, 4)]}.png`}
              alt="fish"
              width={imageSize}
              height={imageSize}
              quality={100}
              priority
              style={{ width: 100, height: 100 }}
            />
          )}
          {i === 0 && shouldWin && (
            <Image
              src={`/assets/slots/${winType}.png`}
              alt="co2"
              width={imageSize}
              height={imageSize}
              quality={100}
              priority
              id={id}
              style={{ width: 100, height: 100 }}
            />
          )}
          {i === 0 && !shouldWin && (
            <Image
              src={`/assets/slots/${SLOT_TYPES[endSlot]}.png`}
              alt="fish"
              width={imageSize}
              height={imageSize}
              quality={100}
              priority
              style={{ width: 100, height: 100 }}
            />
          )}
        </span>
      ))}
    </div>
  )
}

export default SlotMachineReel
