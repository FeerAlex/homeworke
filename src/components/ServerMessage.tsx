import type { ApiResult } from '../types'
import { cx } from '../utils/cx'
import styles from './ServerMessage.module.css'

type Props = {
  result: ApiResult | null
}

/**
 * Ответ сервера под шапкой формы. Раньше в разметке лежали два всегда
 * присутствующих пустых div-а, которые JS показывал и прятал через .show()/.hide();
 * теперь блок просто не рендерится, пока ответа нет.
 */
export const ServerMessage = ({ result }: Props) => {
  if (result === null) return null

  return (
    <p
      role="status"
      className={cx(styles.message, result.ok ? styles.success : styles.failure)}
    >
      {result.message}
    </p>
  )
}
