import { createContext, use } from 'react'

export type AuthValue = {
  /** Логин вошедшего пользователя или null, если сессии нет. */
  user: string | null
  signIn: (login: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthValue | null>(null)

export const useAuth = (): AuthValue => {
  const value = use(AuthContext)

  if (value === null) {
    throw new Error('useAuth вызван вне <AuthProvider>')
  }

  return value
}
