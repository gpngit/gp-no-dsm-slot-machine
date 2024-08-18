'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { GreenBox } from './GreenBox'
import { Prizes } from './Prizes'
import styles from './slotmachine.module.css'

const SLOTS = 10
const SLOT_HEIGHT = 180
const SLOT_ANGLE = 360 / SLOTS
const REEL_RADIUS = Math.round(SLOT_HEIGHT / 2 / Math.tan(Math.PI / SLOTS))
const SPIN_MAX_DURATION = 5

const SLOT_TYPES = ['anemone', 'dumbo', 'co2', 'fish', 'star', 'whale']

enum States {
  SPIN,
  PRIZES,
  ABOUT,
  WON,
}

function SlotMachine() {
  const WIN_PROBABILITY = useRef(0.1)
  const [pageState, setPageState] = useState(States.SPIN)
  const [mounted, setMounted] = useState(false)
  const [spin, setSpin] = useState(false)
  const [shouldWin, setShouldWin] = useState(
    Math.random() < WIN_PROBABILITY.current
  )
  const [winType, setWinType] = useState(SLOT_TYPES[getRandomNumber(0, 5)])
  const [firstRun, setFirstRun] = useState(true)
  const [showAfterSpinModal, setShowAfterSpinModal] = useState(false)
  const complete = useRef(0)
  const currentSlot = useRef<number | false>(false)

  console.log('lol')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (pageState === States.SPIN) {
      const header = document.getElementById('header')
      header?.classList.add('header-enter')
      header?.classList.remove('header-animation')
      header?.classList.remove('header-leave')
    }
    if (pageState === States.ABOUT) {
    }
    if (pageState === States.PRIZES) {
      const header = document.getElementById('header')
      header?.classList.add('header-leave')
      header?.classList.remove('header-enter')
      header?.classList.remove('header-animation')
    }
  }, [pageState])

  const doSpin = () => {
    const header = document.getElementById('header')
    header?.classList.add('header-animation')
    header?.classList.remove('header-enter')
    setShouldWin(Math.random() < WIN_PROBABILITY.current)
    setWinType(SLOT_TYPES[getRandomNumber(0, 5)])
    setFirstRun(false)
    complete.current = 0
    WIN_PROBABILITY.current = WIN_PROBABILITY.current * 1.5
    setShowAfterSpinModal(false)

    if (firstRun) {
      setSpin(true)
    } else {
      setSpin(false)
    }
  }

  const handleOnComplete = useCallback(
    (result: number) => {
      if (complete.current === 0) currentSlot.current = result
      if (currentSlot.current !== result) currentSlot.current = false
      complete.current = complete.current + 1

      if (complete.current === 3) {
        const header = document.getElementById('header')
        header?.classList.remove('header-animation')
        complete.current = 0

        if (!spin && !firstRun) {
          return setSpin(true)
        } else if (shouldWin || currentSlot.current !== false) {
          setShowAfterSpinModal(true)
          WIN_PROBABILITY.current = 0.2
        }
      }
    },
    [complete, shouldWin, spin, firstRun]
  )

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
        withLogo={false}
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
      <div className={styles.wrapper}>
        <div className={styles.frameBg}>
          <Image src="/assets/frame-desktop.png" fill alt="background" />
        </div>
        <div className={styles.main}>
          <div className={styles.frame}>
            <Image src="/assets/slot-machine.png" fill alt="Slot machine" />
          </div>
          <div className={styles.cutOut}>
            <div className={styles.screen}>
              <Reel
                spinning={spin}
                shouldWin={shouldWin}
                winType={winType}
                onComplete={handleOnComplete}
              />
              <Reel
                spinning={spin}
                shouldWin={shouldWin}
                winType={winType}
                onComplete={handleOnComplete}
              />
              <Reel
                spinning={spin}
                shouldWin={shouldWin}
                winType={winType}
                onComplete={handleOnComplete}
                excludeWinner
              />
            </div>
            <div
              className={styles.feedback}
              style={{
                display: showAfterSpinModal ? 'flex' : 'none',
              }}
            >
              <h3>{shouldWin ? 'Gratulerer!' : 'Du tapte'}</h3>
              <p>
                {shouldWin
                  ? 'Du har utryddet en fiskeart! Fortsett å gamble med livet på havbunnen, så kanskje du ødelegger enda mer av det maritime økosystemet!'
                  : 'Hva skal det stå hvis man ikke vinner?'}
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
        </div>
        <div className={styles.footer}>
          <Button size="small" onClick={() => setPageState(States.ABOUT)}>
            Om kampanjen
          </Button>
          <Button wrapperClassName={styles.spinBtn} onClick={() => doSpin()}>
            Spinn
          </Button>
          <Button
            size="small"
            onClick={() => {
              setPageState(States.PRIZES)
            }}
          >
            Gevinster
          </Button>
        </div>
      </div>
    </>
  )
}

const Reel = ({
  spinning,
  shouldWin,
  winType,
  onComplete,
  excludeWinner,
}: {
  shouldWin: boolean
  winType: string
  spinning: boolean
  excludeWinner?: boolean
  onComplete: (winner: number) => void
}) => {
  const [currentAngle, setCurrentAngle] = useState(
    SLOT_ANGLE * getRandomNumber(90, 100)
  )
  const [endSlot, setEndSlot] = useState(getRandomNumber(0, 5))

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
          : 'transform 1ms cubic-bezier(.27,.68,.82,.52)',
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
            <Image
              src={`/assets/slots/${winType}.png`}
              alt="co2"
              width="100"
              height="100"
            />
          ) : (
            <Image
              src={`/assets/slots/${SLOT_TYPES[endSlot]}.png`}
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
