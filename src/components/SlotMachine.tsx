'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { GreenBox } from './GreenBox'
import { Prizes } from './Prizes'
import styles from './slotmachine.module.css'
import { getRandomNumber } from '@/utils/number'
import SlotMachineReel from './SlotMachineReel'

const SLOTS = 10
const SLOT_HEIGHT = 180

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
      if (complete.current === 0 && spin) currentSlot.current = result
      if (currentSlot.current !== result) currentSlot.current = false
      complete.current = complete.current + 1

      if (complete.current === 3) {
        const header = document.getElementById('header')
        header?.classList.remove('header-animation')
        complete.current = 0

        if (!spin && !firstRun) {
          return setSpin(true)
        } else if (
          spin &&
          (shouldWin || typeof currentSlot.current === 'number')
        ) {
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
              <SlotMachineReel
                spinning={spin}
                shouldWin={shouldWin}
                winType={winType}
                onComplete={handleOnComplete}
              />
              <SlotMachineReel
                spinning={spin}
                shouldWin={shouldWin}
                winType={winType}
                onComplete={handleOnComplete}
              />
              <SlotMachineReel
                spinning={spin}
                shouldWin={shouldWin}
                winType={winType}
                onComplete={handleOnComplete}
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

export default SlotMachine
