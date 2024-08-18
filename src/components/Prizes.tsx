import { FC } from "react"
import styles from "./prizes.module.css"

export const Prizes: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.prizesRow}>
        <div className={styles.prizesPart}>
          <h3 className={styles.prizesHeading}>1. premie</h3>
          <p className={styles.prizesContent}>En fiskeart utryddet</p>
        </div>
      </div>
    </div>
  )
}
