import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import styles from './Modal.module.css'

type Props = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ open, title, onClose, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog === null) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      // Клик мимо окна попадает в сам <dialog> — значит, кликнули по подложке.
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          type="button"
          className={styles.close}
          aria-label="Закрыть окно"
          onClick={() => dialogRef.current?.close()}
        />
      </div>

      <div className={styles.body}>{children}</div>
    </dialog>
  )
}
