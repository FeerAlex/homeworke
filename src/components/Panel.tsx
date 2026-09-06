import type { ReactNode } from 'react'
import { cx } from '../utils/cx'
import styles from './Panel.module.css'

type Props = {
  /** Заголовок с бирюзовым подчёркиванием. Без него секция идёт без шапки. */
  title?: string
  className?: string
  children: ReactNode
}

export const Panel = ({ title, className, children }: Props) => (
  <article className={cx(styles.panel, className)}>
    {title !== undefined && <h2 className={styles.title}>{title}</h2>}
    {children}
  </article>
)
