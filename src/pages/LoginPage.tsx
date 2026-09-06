import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../auth/context'
import { Field } from '../components/Field'
import { Footer } from '../components/Footer'
import { ServerMessage } from '../components/ServerMessage'
import type { FieldRules } from '../hooks/useForm'
import { useForm } from '../hooks/useForm'
import { cx } from '../utils/cx'
import controls from '../styles/controls.module.css'
import styles from './LoginPage.module.css'

type FieldName = 'login' | 'password'

const SCHEMA: Record<FieldName, FieldRules> = {
  login: { required: 'Введите логин!' },
  password: { required: 'Введите пароль!' },
}

/** Пауза перед переходом, чтобы успеть прочитать «Добро пожаловать». */
const REDIRECT_DELAY_MS = 1200

/** Куда вернуть пользователя после входа, если он шёл на закрытую страницу. */
type RedirectState = { from?: string } | null

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signIn } = useAuth()

  const from = (location.state as RedirectState)?.from ?? '/'

  // Снимок на момент открытия страницы: если сессия уже была, форму
  // показывать незачем. Проверка именно снимка, а не текущего user, —
  // иначе успешный вход мгновенно уводил бы со страницы, не дав прочитать
  // «Добро пожаловать».
  const [wasSignedIn] = useState(() => user !== null)

  const { values, getFieldProps, handleSubmit, result, isSubmitting } = useForm({
    schema: SCHEMA,
    endpoint: '/api/login',
    onSuccess: () => signIn(values.login),
  })

  // В старом login.js обе ветки ответа сервера были пустыми — вход
  // ничем не заканчивался. Теперь он возвращает туда, куда пользователь шёл.
  useEffect(() => {
    if (result?.ok !== true) return

    const timer = setTimeout(() => void navigate(from, { replace: true }), REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [from, navigate, result])

  const loginField = getFieldProps('login')
  const passwordField = getFieldProps('password')

  if (wasSignedIn) return <Navigate to={from} replace />

  return (
    <>
      <title>Вход — демо-портфолио</title>

      <main className={styles.screen}>
        <div className={styles.card}>
          <h1 className={styles.title}>Авторизируйтесь</h1>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <ServerMessage result={result} />

            <Field label="Логин" htmlFor="login" error={loginField.error}>
              <input
                id="login"
                type="text"
                placeholder="Введите логин"
                autoComplete="username"
                className={cx(controls.input, loginField.error !== undefined && controls.hasError)}
                value={loginField.value}
                onChange={(event) => loginField.onChange(event.target.value)}
              />
            </Field>

            <div className={styles.password}>
              <Field label="Пароль" htmlFor="password" error={passwordField.error}>
                <input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  className={cx(
                    controls.input,
                    passwordField.error !== undefined && controls.hasError,
                  )}
                  value={passwordField.value}
                  onChange={(event) => passwordField.onChange(event.target.value)}
                />
              </Field>
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={cx(controls.button, styles.submit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Вхожу…' : 'Войти'}
              </button>
            </div>

            <p className={styles.hint}>Демо-доступ: demo / demo12345</p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}
