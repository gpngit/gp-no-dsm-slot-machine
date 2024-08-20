import { ElementType, FC, ReactNode } from 'react'
import styles from './button.module.css'

export const Button: FC<{
  children: ReactNode
  size?: 'small' | 'large'
  onClick: () => void
  wrapperClassName?: string
  as?: ElementType
}> = ({
  children,
  onClick,
  wrapperClassName,
  size = 'large',
  as: Component = 'button',
  ...rest
}) => {
  return (
    <div
      className={`${styles.buttonWrapper} ${styles[size]} ${
        wrapperClassName ? wrapperClassName : ''
      }`}
    >
      <Component onClick={onClick} className={styles.button} {...rest}>
        {children}
      </Component>
    </div>
  )
}
