import { useAuth } from '../auth/context'
import styles from './Footer.module.css'

export const Footer = () => {
  const { user, signOut } = useAuth()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/*
          Ссылки «Войти» здесь больше нет: сайт закрыт целиком, и на любой
          странице с подвалом пользователь уже вошёл. Аноним видит только
          форму входа, а у неё подвал пустой.
        */}
        {user !== null && (
          <button type="button" className={styles.logout} onClick={signOut}>
            Выйти
          </button>
        )}

        <p className={styles.copy}>
          © 2015, демонстрационный сайт-портфолио. Все данные на нём вымышлены.
        </p>
      </div>
    </footer>
  )
}
