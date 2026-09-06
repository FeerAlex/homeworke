import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './context'

const STORAGE_KEY = 'portfolio.user'

/**
 * Сессия живёт в sessionStorage: переживает перезагрузку страницы и
 * заканчивается вместе с вкладкой. Обращение к хранилищу обёрнуто в try:
 * в приватном режиме и при запрете на хранение данных оно бросает исключение,
 * и сайт должен продолжать работать — просто без запоминания входа.
 */
const readStoredUser = (): string | null => {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(readStoredUser)

  const signIn = useCallback((login: string) => {
    setUser(login)
    try {
      sessionStorage.setItem(STORAGE_KEY, login)
    } catch {
      // Вход всё равно действует — до конца текущей загрузки страницы.
    }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Нечего удалять — записать тоже не удалось.
    }
  }, [])

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut])

  return <AuthContext value={value}>{children}</AuthContext>
}
