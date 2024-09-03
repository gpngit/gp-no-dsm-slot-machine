'use client'

import { getRandomNumber } from '@/utils/number'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './Button'
import { GreenBox } from './GreenBox'
import { Prizes } from './Prizes'
import styles from './slotmachine.module.css'
import SlotMachineReel from './SlotMachineReel'
import { Won } from './Won'

const SLOTS = 10
const SLOT_HEIGHT = 180

export const SLOT_TYPES = ['anemone', 'dumbo', 'co2', 'fish', 'star', 'whale']

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
      const header = document.getElementById('header')
      header?.classList.add('header-leave')
      header?.classList.remove('header-enter')
      header?.classList.remove('header-animation')
    }
    if (pageState === States.PRIZES) {
      const header = document.getElementById('header')
      header?.classList.add('header-leave')
      header?.classList.remove('header-enter')
      header?.classList.remove('header-animation')
    }
    if (pageState === States.WON) {
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
          const reel1 = document.getElementById('reel1')
          const reel2 = document.getElementById('reel2')
          const reel3 = document.getElementById('reel3')
          const reels = [reel1, reel2, reel3]

          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              reels[i]?.classList.add('win')
            }, i * 100)
          }

          confetti({
            shapes: ['circle'],
            particleCount: 460,
            spread: 100,
            scalar: 3,
            drift: 2,
            gravity: 5,
            decay: 0.9,
            startVelocity: 90,
            colors: ['#FDB02A', '#FCE48E', '#F0A048'],
          })

          setTimeout(() => {
            setPageState(States.WON)

            for (const reel of reels) {
              reel?.classList.remove('win')
            }
          }, 2000)
          WIN_PROBABILITY.current = 0.2
        }
      }
    },
    [complete, shouldWin, spin, firstRun]
  )

  if (!mounted) return null

  if (pageState === States.WON) {
    return (
      <Won slotType={winType} onPlayAgain={() => setPageState(States.SPIN)} />
    )
  }
  if (pageState === States.PRIZES) {
    return (
      <GreenBox
        btnText="Spill"
        onBtnClick={() => setPageState(States.SPIN)}
        heading='"Gevinster"'
        renderHeadingAbove={false}
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
          Arktis? Dette er gambling med naturen, og vi har alt å tape.Greenpeace
          jobber for å stoppe dette og beskytte livet i Arktis og i dyphavet.
        </p>
        <div className={styles.aboutBtns}>
          Les mer og signer oppropet for å beskytte dyphavet{' '}
          <a href="https://www.greenpeace.org/norway/vaer-med/stopp-gruvedrift-pa-havbunnen/?utm_medium=referral&utm_source=deepseabetting&utm_campaign=no_pg_oceans&utm_content=no_pg_dsm&utm_term=none_none_none_slot-machine-site-about-campaign">
            her
          </a>
          <br />
          <p style={{ fontSize: 14 }}>
            Har du et spilleproblem? Du kan få hjelp og noen å snakke med{' '}
            <a href="https://hjelpelinjen.no/">her</a>
          </p>
        </div>
      </GreenBox>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.frameBg}>
        <Image src="/assets/frame-desktop.png" fill alt="background" priority />
      </div>
      <div className={styles.altatape}>
        <Image
          src="/assets/altatape.png"
          alt="background"
          priority
          fill
          quality={100}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.frame}>
          <Image
            src="/assets/slot-machine.png"
            fill
            alt="Slot machine"
            priority
            quality={100}
          />
        </div>
        <div className={styles.cutOut}>
          <div className={styles.screen}>
            <SlotMachineReel
              spinning={spin}
              shouldWin={shouldWin}
              winType={winType}
              onComplete={handleOnComplete}
              id="reel1"
            />
            <SlotMachineReel
              spinning={spin}
              shouldWin={shouldWin}
              winType={winType}
              onComplete={handleOnComplete}
              id="reel2"
            />
            <SlotMachineReel
              spinning={spin}
              shouldWin={shouldWin}
              winType={winType}
              onComplete={handleOnComplete}
              id="reel3"
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
        <div className={styles.spinBtn}>
          <a onClick={() => doSpin()}>
            <Image src="/assets/playBtn.png" alt="play button" fill />
          </a>
        </div>
        <Button
          size="small"
          onClick={() => {
            setPageState(States.PRIZES)
          }}
        >
          Gevinster
        </Button>
      </div>
      <div id="party" />
    </div>
  )
}

export default SlotMachine
