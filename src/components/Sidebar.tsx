import { NavLink } from 'react-router'
import { cx } from '../utils/cx'
import styles from './Sidebar.module.css'

const PAGES = [
  { to: '/', label: 'Обо мне' },
  { to: '/projects', label: 'Мои работы' },
  { to: '/contact', label: 'Связаться со мной' },
]

const CONTACTS = [
  { href: 'mailto:ivan@example.com', label: 'ivan@example.com', modifier: styles.mail },
  { href: 'tel:+79000000000', label: '+7 900 000-00-00', modifier: styles.tel },
  { href: 'skype:example.demo?chat', label: 'example.demo', modifier: styles.skype },
]

export const Sidebar = () => (
  <aside className={styles.sidebar}>
    <nav className={styles.menu}>
      <ul>
        {PAGES.map((page) => (
          <li key={page.to} className={styles.menuItem}>
            {/*
              Активный пункт больше не проставляется руками в каждом html-файле —
              роутер сам знает, какая страница открыта.
            */}
            <NavLink
              to={page.to}
              end={page.to === '/'}
              className={({ isActive }) => cx(styles.menuLink, isActive && styles.menuLinkActive)}
            >
              {page.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    <address className={styles.contacts}>
      <h2 className={styles.contactsTitle}>Контакты</h2>
      <ul>
        {CONTACTS.map((contact) => (
          <li key={contact.href}>
            <a className={cx(styles.contactLink, contact.modifier)} href={contact.href}>
              {contact.label}
            </a>
          </li>
        ))}
      </ul>
    </address>
  </aside>
)
