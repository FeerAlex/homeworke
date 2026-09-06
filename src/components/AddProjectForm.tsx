import { useState } from 'react'
import type { FieldRules } from '../hooks/useForm'
import { useForm } from '../hooks/useForm'
import type { Project } from '../types'
import { cx } from '../utils/cx'
import { Field } from './Field'
import { ServerMessage } from './ServerMessage'
import controls from '../styles/controls.module.css'
import styles from './AddProjectForm.module.css'

type FieldName = 'name' | 'picture' | 'url' | 'description'

const SCHEMA: Record<FieldName, FieldRules> = {
  name: { required: 'Введите название проекта' },
  picture: { required: 'Вы не выбрали картинку' },
  url: { required: 'Укажите url!' },
  description: { required: 'Добавьте описание!' },
}

type Props = {
  onAdded: (project: Project) => void
}

export const AddProjectForm = ({ onAdded }: Props) => {
  const [picture, setPicture] = useState<File | null>(null)

  const { values, getFieldProps, setValue, handleSubmit, result, isSubmitting } = useForm({
    schema: SCHEMA,
    endpoint: '/api/projects',
    onSuccess: () => {
      onAdded({
        id: crypto.randomUUID(),
        title: values.name,
        url: values.url,
        urlLabel: values.url,
        description: values.description,
        image: picture === null ? '' : URL.createObjectURL(picture),
      })
    },
  })

  const nameField = getFieldProps('name')
  const pictureField = getFieldProps('picture')
  const urlField = getFieldProps('url')
  const descriptionField = getFieldProps('description')

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <ServerMessage result={result} />

      <Field
        label="Название проекта"
        htmlFor="project-name"
        error={nameField.error}
      >
        <input
          id="project-name"
          type="text"
          placeholder="Введите название"
          className={cx(controls.input, nameField.error !== undefined && controls.hasError)}
          value={nameField.value}
          onChange={(event) => nameField.onChange(event.target.value)}
        />
      </Field>

      <Field
        label="Картинка проекта"
        htmlFor="project-picture"
        error={pictureField.error}
      >
        <div className={cx(styles.filePicker, pictureField.error !== undefined && styles.filePickerError)}>
          <span className={styles.fileName}>
            {values.picture === '' ? 'Загрузите изображение' : values.picture}
          </span>
          <span className={styles.fileButton} aria-hidden="true" />
          <input
            id="project-picture"
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null
              setPicture(file)
              setValue('picture', file?.name ?? '')
            }}
          />
        </div>
      </Field>

      <Field
        label="URL проекта"
        htmlFor="project-url"
        error={urlField.error}
      >
        <input
          id="project-url"
          type="text"
          placeholder="Добавьте ссылку"
          className={cx(controls.input, urlField.error !== undefined && controls.hasError)}
          value={urlField.value}
          onChange={(event) => urlField.onChange(event.target.value)}
        />
      </Field>

      <Field
        label="Описание"
        htmlFor="project-info"
        error={descriptionField.error}
      >
        <textarea
          id="project-info"
          placeholder="Пара слов о вашем проекте"
          className={cx(controls.textarea, descriptionField.error !== undefined && controls.hasError)}
          value={descriptionField.value}
          onChange={(event) => descriptionField.onChange(event.target.value)}
        />
      </Field>

      <div className={styles.actions}>
        <button type="submit" className={controls.button} disabled={isSubmitting}>
          {isSubmitting ? 'Добавляю…' : 'Добавить'}
        </button>
      </div>
    </form>
  )
}
