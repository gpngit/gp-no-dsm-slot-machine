import Image from 'next/image'
import { FC, ReactNode } from 'react'
import styles from './greenbox.module.css'

export const GreenBox: FC<{
  children: ReactNode
  withLogo?: boolean
  renderHeadingAbove?: boolean
  heading?: string
  btnText: string
  onBtnClick: () => void
}> = ({
  children,
  heading,
  btnText,
  onBtnClick,
  renderHeadingAbove = false,
  withLogo = true,
}) => {
  return (
    <>
      {heading && renderHeadingAbove && (
        <h1 className={styles.headingAbove}>{heading}</h1>
      )}
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.innerScroll}>
            {heading && !renderHeadingAbove && (
              <h1 className={styles.heading}>{heading}</h1>
            )}
            <div className={styles.content}>{children}</div>
            <div className={styles.btnWrapper}>
              <a href="#" onClick={onBtnClick}>
                <Image src="/assets/backBtn.png" alt="play button" fill />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
