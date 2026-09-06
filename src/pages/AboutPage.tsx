import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { Panel } from '../components/Panel'
import { cx } from '../utils/cx'
import avatar from '../assets/img/avatar-placeholder.svg'
import styles from './AboutPage.module.css'

const SKILLS = ['html', 'CSS', 'javascript', 'gulp', 'git']

const FACTS: { question: string; answer: ReactNode }[] = [
  { question: 'Меня зовут:', answer: 'Иванов Иван Иванович' },
  { question: 'Мой возраст:', answer: '20 лет' },
  { question: 'Мой город:', answer: 'Москва, Россия' },
  { question: 'Моя специализация:', answer: 'FRONTEND-разработчик' },
  {
    question: 'Ключевые навыки:',
    answer: (
      <ul className={styles.skills}>
        {SKILLS.map((skill) => (
          <li key={skill} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>
    ),
  },
]

type Entry = {
  place: string
  time: string
  icon: 'work' | 'course' | 'list'
}

const EXPERIENCE: Entry[] = [
  { place: '«Пример и партнёры» — вёрстка лендингов', time: 'Сентябрь 2014 — Август 2015', icon: 'work' },
  { place: '«Тестовая компания» — продавец-консультант', time: 'Сентябрь 2011 — Август 2014', icon: 'work' },
]

const EDUCATION: Entry[] = [
  {
    place: 'Незаконченное высшее. Технический университет',
    time: 'Сентябрь 2013 — по настоящее время',
    icon: 'course',
  },
  { place: 'Онлайн-курсы по фронтенду', time: 'Сентябрь 2015 — по настоящее время', icon: 'list' },
]

const EntryList = ({ entries }: { entries: Entry[] }) => (
  <ul className={styles.entries}>
    {entries.map((entry, index) => (
      <li key={`${entry.place}-${index}`} className={cx(styles.entry, styles[entry.icon])}>
        <p className={styles.place}>{entry.place}</p>
        <p className={styles.time}>{entry.time}</p>
      </li>
    ))}
  </ul>
)

export const AboutPage = () => (
  <>
    <title>Обо мне — демо-портфолио</title>

    <Panel title="Основная информация">
      <div className={styles.summary}>
        <div className={styles.avatar}>
          <img src={avatar} alt="" width={140} height={140} />
        </div>

        <dl className={styles.facts}>
          {FACTS.map((fact) => (
            <Fragment key={fact.question}>
              <dt className={styles.question}>{fact.question}</dt>
              <dd className={styles.answer}>{fact.answer}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </Panel>

    <Panel title="Опыт работы">
      <EntryList entries={EXPERIENCE} />
    </Panel>

    <Panel title="Образование">
      <EntryList entries={EDUCATION} />
    </Panel>
  </>
)
