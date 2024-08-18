"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { GreenBox } from "./GreenBox"
import { Prizes } from "./Prizes"
import styles from "./slotmachine.module.css"

const SLOTS = 7
const WIN_PROBABILITY = 0.9 // 10%
const SLOT_HEIGHT = 130
const SLOT_ANGLE = 360 / SLOTS
const REEL_RADIUS = Math.round(SLOT_HEIGHT / 2 / Math.tan(Math.PI / SLOTS))
const SPIN_MAX_DURATION = 2

const SLOT_TYPES = ["anemone", "dumbo", "fish", "machine", "star", "whale"]

enum States {
  SPIN,
  PRIZES,
  ABOUT,
  WON,
}

function SlotMachine() {
  const [pageState, setPageState] = useState(States.PRIZES)
  const [mounted, setMounted] = useState(false)
  const [spin, setSpin] = useState(false)
  const [shouldWin, setShouldWin] = useState(Math.random() > WIN_PROBABILITY)
  const [firstRun, setFirstRun] = useState(true)
  const [showAfterSpinModal, setShowAfterSpinModal] = useState(false)
  const complete = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const doSpin = () => {
    const header = document.getElementById("header")
    header?.classList.add("header-animation")
    header?.classList.remove("header-enter")
    setShouldWin(Math.random() > WIN_PROBABILITY)
    setFirstRun(false)
    complete.current = 0
    if (firstRun) {
      setSpin(true)
    } else {
      setSpin(false)
    }
  }

  const handleOnComplete = useCallback(() => {
    console.log("is complete")
    complete.current = complete.current + 1
    if (complete.current === 3) {
      const header = document.getElementById("header")
      header?.classList.remove("header-animation")

      if (!spin && !firstRun) {
        setSpin(true)
        return (complete.current = 0)
      }
      if (shouldWin && spin) setShowAfterSpinModal(true)
    }
  }, [complete, shouldWin, spin, firstRun])

  if (!mounted) return null

  if (pageState === States.PRIZES) {
    return (
      <GreenBox
        btnText="Spill"
        onBtnClick={() => setPageState(States.SPIN)}
        heading="Gevinster"
        renderHeadingAbove={true}
        withLogo={false}
      >
        <Prizes />
      </GreenBox>
    )
  }
  if (pageState === States.ABOUT) {
    return (
      <GreenBox
        btnText="Spill"
        onBtnClick={() => setPageState(States.SPIN)}
        heading="Om kampanjen"
        withLogo={true}
      >
        <p>
          Visste du at Norge vil starte gruvedrift på havbunnen i sårbare
          Arktis? Dette er gambling med naturen der vi har alt å tape.
          Greenpeace jobber for å stoppe dette og beskytte livet i Arktis og i
          dyphavet.
        </p>
      </GreenBox>
    )
  }

  return (
    <>
      <header id="header" className="header-enter">
        <Image
          src="/assets/dsb-logo.png"
          alt="Deep sea betting logo"
          width="591"
          height="319"
        />
      </header>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.frame}>
            <div className={styles.screen}>
              <Reel
                spinning={spin}
                shouldWin={shouldWin}
                onComplete={handleOnComplete}
              />
              <Reel
                spinning={spin}
                shouldWin={shouldWin}
                onComplete={handleOnComplete}
              />
              <Reel
                spinning={spin}
                shouldWin={shouldWin}
                onComplete={handleOnComplete}
              />
            </div>
          </div>
          <div className={styles.slotFrame} />
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
        <button className={styles.spinBtn} onClick={doSpin}>
          Spinn
        </button>
      </div>
    </>
  )
}

const Reel = ({
  spinning,
  shouldWin,
  onComplete,
}: {
  shouldWin: boolean
  spinning: boolean
  onComplete: () => void
}) => {
  const [currentAngle, setCurrentAngle] = useState(
    SLOT_ANGLE * getRandomNumber(50, 120)
  )

  useEffect(() => {
    setCurrentAngle(SLOT_ANGLE * getRandomNumber(50, 120))
  }, [spinning, shouldWin])

  return (
    <div
      className={styles.reel}
      suppressHydrationWarning
      onTransitionEnd={onComplete}
      style={{
        transform: spinning ? `rotateX(0deg)` : `rotateX(${currentAngle}deg)`,
        transition: spinning
          ? `transform ${getRandomNumber(
              1,
              SPIN_MAX_DURATION
            )}s cubic-bezier(.17,.67,.07,.97)`
          : "transform 0.2s cubic-bezier(.27,.68,.82,.52)",
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
            <img src={`/assets/slots/co2.png`} alt="co2" width="100" />
          ) : (
            <img
              src={`/assets/slots/${SLOT_TYPES[getRandomNumber(0, 5)]}.svg`}
              alt="fish"
              style={{ maxHeight: "90px", maxWidth: "90px" }}
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
