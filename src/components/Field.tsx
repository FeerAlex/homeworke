import type { ReactNode } from 'react'
import controls from '../styles/controls.module.css'
import styles from './Field.module.css'

type Props = {
  label: string
  /** id элемента управления внутри — связывает его с подписью. */
  htmlFor: string
  error?: string | undefined
  children: ReactNode
}

/** Подпись + поле + подсказка с ошибкой. */
export const Field = ({ label, htmlFor, error, children }: Props) => (
  <div className={styles.field}>
    <label className={controls.label} htmlFor={htmlFor}>
      {label}
    </label>

    <div className={styles.control}>
      {children}

      {error !== undefined && (
        <span role="alert" className={styles.tooltip}>
          {error}
        </span>
      )}
    </div>
  </div>
)
