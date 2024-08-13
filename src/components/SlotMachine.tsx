"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "./slotmachine.module.css"

const SLOTS = 7
const WIN_PROBABILITY = 0.2 // 80%
const SLOT_HEIGHT = 150
const SLOT_ANGLE = 360 / SLOTS
const REEL_RADIUS = Math.round(SLOT_HEIGHT / 2 / Math.tan(Math.PI / SLOTS))
const SPIN_MAX_DURATION = 5

const SLOT_TYPES = ["fish", "dead-fish", "star", "tentacle", "co2"]

function SlotMachine() {
  const [spin, setSpin] = useState(false)
  const [shouldWin, setShouldWin] = useState(Math.random() > WIN_PROBABILITY)
  const [showAfterSpinModal, setShowAfterSpinModal] = useState(false)

  useEffect(() => {
    if (spin) {
    }
  }, [spin])

  const doSpin = () => {
    const shouldWin = Math.random() > WIN_PROBABILITY
    setSpin(false)
    setShowAfterSpinModal(false)
    setShouldWin(shouldWin)
    setTimeout(() => {
      setSpin(true)
    }, 100)
    setTimeout(() => {
      setShowAfterSpinModal(true)
    }, SPIN_MAX_DURATION * 1000)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.frame}>
          <div className={styles.screen}>
            <Reel spinning={spin} shouldWin={shouldWin} />
            <Reel spinning={spin} shouldWin={shouldWin} />
            <Reel spinning={spin} shouldWin={shouldWin} />
          </div>
        </div>
        <div className={styles.slotFrame}></div>

        <div
          className={styles.feedback}
          style={{ display: showAfterSpinModal ? "flex" : "none" }}
        >
          <h3>{shouldWin ? "Gratulerer!" : "Du tapte"}</h3>
          <p>
            {shouldWin
              ? "Du har utryddet en fiskeart! Fortsett å gamble med livet på havbunnen, så kanskje du ødelegger enda mer av det maritime økosystemet!"
              : "Hva skal det stå hvis man ikke vinner?"}
          </p>
          <div className={styles.feedbackBtns}>
            <button onClick={() => doSpin()}>Spinn igjen!</button>
            <a
              href="https://www.greenpeace.org/norway/vaer-med/stopp-gruvedrift-pa-havbunnen/"
              target="_blank"
            >
              Signer oppropet
            </a>
          </div>
        </div>
      </div>

      <button className={styles.spinBtn} onClick={() => doSpin()}>
        Spinn
      </button>
    </div>
  )
}

const Reel = ({
  spinning,
  shouldWin,
}: {
  shouldWin: boolean
  spinning: boolean
}) => {
  const [currentAngle, setCurrentAngle] = useState(
    SLOT_ANGLE * getRandomNumber(50, 120)
  )

  return (
    <div
      className={styles.reel}
      suppressHydrationWarning
      style={{
        transform: spinning ? `rotateX(0deg)` : `rotateX(${currentAngle}deg)`,
        transition: spinning
          ? `transform ${getRandomNumber(
              2,
              SPIN_MAX_DURATION
            )}s cubic-bezier(0,.67,0,1.01)`
          : "none",
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
          {i === 0 && shouldWin ? (
            <Image src={`/assets/co2.png`} alt="co2" width="100" height="100" />
          ) : (
            <Image
              src={`/assets/${SLOT_TYPES[getRandomNumber(0, 4)]}.png`}
              alt="fish"
              width="100"
              height="100"
            />
          )}
        </span>
      ))}
    </div>
  )
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default SlotMachine
