import type { Project } from '../types'
import project1 from '../assets/img/project1.svg'
import project2 from '../assets/img/project2.svg'
import project3 from '../assets/img/project3.svg'
import project4 from '../assets/img/project4.svg'

/**
 * Раньше карточки были захардкожены прямо в my_projects.html.
 * Здесь это типизированные данные, а разметку рисует один map.
 * Содержимое — демонстрационное, ссылки ведут на example.com.
 */
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'online-diary',
    title: 'онлайн-дневник',
    url: 'https://example.com/diary',
    urlLabel: 'example.com/diary',
    description: 'Онлайн-дневник. Первый свёрстанный сайт.',
    image: project1,
  },
  {
    id: 'landing',
    title: 'лендинг',
    url: 'https://example.com/landing',
    urlLabel: 'example.com/landing',
    description: 'Одностраничный сайт с формой обратной связи.',
    image: project2,
  },
  {
    id: 'shop',
    title: 'магазин',
    url: 'https://example.com/shop',
    urlLabel: 'example.com/shop',
    description: 'Каталог товаров с фильтрами и корзиной.',
    image: project3,
  },
  {
    id: 'blog',
    title: 'блог',
    url: 'https://example.com/blog',
    urlLabel: 'example.com/blog',
    description: 'Блог с постраничной навигацией и тегами.',
    image: project4,
  },
]
