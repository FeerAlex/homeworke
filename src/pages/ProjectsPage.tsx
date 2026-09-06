import { useEffect, useRef, useState } from 'react'
import { AddProjectForm } from '../components/AddProjectForm'
import { Modal } from '../components/Modal'
import { Panel } from '../components/Panel'
import { INITIAL_PROJECTS } from '../data/projects'
import type { Project } from '../types'
import styles from './ProjectsPage.module.css'

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Счётчик открытий — ключ формы. Каждое новое открытие монтирует её заново,
  // то есть очищает поля: раньше это делал form.trigger('reset') в onClose.
  const [openCount, setOpenCount] = useState(0)

  // Превью добавленной картинки живёт как blob:-ссылка. Копим такие ссылки
  // и освобождаем их при уходе со страницы, чтобы файлы не висели в памяти.
  const blobUrls = useRef<string[]>([])

  useEffect(
    () => () => {
      for (const url of blobUrls.current) URL.revokeObjectURL(url)
    },
    [],
  )

  const openDialog = () => {
    setOpenCount((count) => count + 1)
    setIsDialogOpen(true)
  }

  const addProject = (project: Project) => {
    if (project.image.startsWith('blob:')) blobUrls.current.push(project.image)
    setProjects((current) => [...current, project])
  }

  return (
    <>
      <title>Мои работы — демо-портфолио</title>

      <Panel title="Мои работы">
        <ul className={styles.grid}>
          {projects.map((project) => (
            <li key={project.id} className={styles.card}>
              <div className={styles.thumb}>
                {project.image !== '' && <img src={project.image} alt="" loading="lazy" />}
                <div className={styles.caption}>
                  <a
                    className={styles.captionLink}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.title}
                  </a>
                </div>
              </div>

              <a className={styles.link} href={project.url} target="_blank" rel="noreferrer">
                {project.urlLabel}
              </a>
              <p className={styles.description}>{project.description}</p>
            </li>
          ))}

          <li>
            <button type="button" className={styles.addTile} onClick={openDialog}>
              Добавить проект
            </button>
          </li>
        </ul>
      </Panel>

      <Modal open={isDialogOpen} title="Добавление проекта" onClose={() => setIsDialogOpen(false)}>
        <AddProjectForm key={openCount} onAdded={addProject} />
      </Modal>
    </>
  )
}
