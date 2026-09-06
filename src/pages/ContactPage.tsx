import { Field } from '../components/Field'
import { Panel } from '../components/Panel'
import { ServerMessage } from '../components/ServerMessage'
import type { FieldRules } from '../hooks/useForm'
import { useForm } from '../hooks/useForm'
import { cx } from '../utils/cx'
import codeImage from '../assets/img/code.jpg'
import controls from '../styles/controls.module.css'
import styles from './ContactPage.module.css'

type FieldName = 'name' | 'email' | 'message' | 'code'

const SCHEMA: Record<FieldName, FieldRules> = {
  name: { required: 'Вы не ввели имя!' },
  email: { required: 'Вы не ввели email!' },
  message: { required: 'Опишите свой проект!' },
  code: { required: 'Вы не ввели код!' },
}

export const ContactPage = () => {
  const { getFieldProps, handleSubmit, reset, result, isSubmitting } = useForm({
    schema: SCHEMA,
    endpoint: '/api/contact',
  })

  const nameField = getFieldProps('name')
  const emailField = getFieldProps('email')
  const messageField = getFieldProps('message')
  const codeField = getFieldProps('code')

  return (
    <Panel>
      <title>Связаться со мной — демо-портфолио</title>
      <h1 className={styles.banner}>У вас интересный проект? Напишите мне</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.full}>
          <ServerMessage result={result} />
        </div>

        <Field label="Имя" htmlFor="contact-name" error={nameField.error}>
          <input
            id="contact-name"
            type="text"
            placeholder="Как к вам обращаться"
            autoComplete="name"
            className={cx(controls.input, nameField.error !== undefined && controls.hasError)}
            value={nameField.value}
            onChange={(event) => nameField.onChange(event.target.value)}
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" error={emailField.error}>
          <input
            id="contact-email"
            type="email"
            placeholder="Куда мне писать"
            autoComplete="email"
            className={cx(controls.input, emailField.error !== undefined && controls.hasError)}
            value={emailField.value}
            onChange={(event) => emailField.onChange(event.target.value)}
          />
        </Field>

        <div className={styles.full}>
          <Field label="Сообщение" htmlFor="contact-message" error={messageField.error}>
            <textarea
              id="contact-message"
              placeholder="Кратко в чём суть"
              className={cx(controls.textarea, messageField.error !== undefined && controls.hasError)}
              value={messageField.value}
              onChange={(event) => messageField.onChange(event.target.value)}
            />
          </Field>
        </div>

        <div className={styles.full}>
          <Field
            label="Введите код, указанный на картинке"
            htmlFor="contact-code"
            error={codeField.error}
          >
            <div className={styles.captchaRow}>
              <img
                className={styles.captchaImage}
                src={codeImage}
                alt="Код с картинки"
                width={191}
                height={79}
              />
              <input
                id="contact-code"
                type="text"
                placeholder="Введите код"
                className={cx(controls.input, codeField.error !== undefined && controls.hasError)}
                value={codeField.value}
                onChange={(event) => codeField.onChange(event.target.value)}
              />
            </div>
          </Field>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={controls.button} disabled={isSubmitting}>
            {isSubmitting ? 'Отправляю…' : 'Отправить'}
          </button>
          <button
            type="button"
            className={cx(controls.button, controls.buttonSecondary)}
            onClick={reset}
          >
            Очистить
          </button>
        </div>
      </form>
    </Panel>
  )
}
