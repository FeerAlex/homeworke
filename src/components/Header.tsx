import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import styles from './Header.module.css'

type Social = {
  id: string
  label: string
  href: string
  /** Координаты иконки в спрайте: обычное состояние и наведение. */
  sprite: string
  spriteHover: string
}

const SOCIALS: Social[] = [
  { id: 'vk', label: 'vk.com', href: 'https://vk.com/example', sprite: '-5px -119px', spriteHover: '-61px -119px' },
  { id: 'tw', label: 'twitter.com', href: 'https://twitter.com/example', sprite: '-119px -5px', spriteHover: '-119px -62px' },
  { id: 'fb', label: 'facebook.com', href: 'https://facebook.com/example', sprite: '-5px -5px', spriteHover: '-62px -5px' },
  { id: 'gh', label: 'github.com', href: 'https://github.com/example', sprite: '-5px -62px', spriteHover: '-62px -62px' },
]

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <Link className={styles.logo} to="/">
        <span className={styles.logoMark} aria-hidden="true">
          П
        </span>
        <span className={styles.logoText}>Сайт портфолио</span>
      </Link>

      <ul className={styles.socialList}>
        {SOCIALS.map((social) => (
          <li key={social.id}>
            <a
              className={styles.socialLink}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              style={{ '--sprite': social.sprite, '--sprite-hover': social.spriteHover } as CSSProperties}
            >
              <span className="visually-hidden">{social.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </header>
)
