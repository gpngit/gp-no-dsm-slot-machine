import { FC, ReactNode } from 'react'
import styles from './button.module.css'

export const Button: FC<{
  children: ReactNode
  size?: 'small' | 'large'
  onClick: () => void
}> = ({ children, onClick, size = 'large' }) => {
  return (
    <div className={`${styles.buttonWrapper} ${styles[size]}`}>
      <button onClick={onClick} className={styles.button}>
        {children}
      </button>
    </div>
  )
}
