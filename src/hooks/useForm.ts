import { useCallback, useMemo, useState } from 'react'
import { postJson } from '../api/client'
import type { ApiResult } from '../types'

export type FieldRules = {
  /** Текст подсказки, если поле осталось пустым. */
  required: string
}

type Options<Name extends string> = {
  /** Поля формы и правила для каждого. Ключи уходят в тело запроса как есть. */
  schema: Record<Name, FieldRules>
  endpoint: string
  onSuccess?: (result: ApiResult) => void
}

export type FieldProps = {
  name: string
  value: string
  error: string | undefined
  onChange: (value: string) => void
}

const buildInitialValues = <Name extends string>(
  schema: Record<Name, FieldRules>,
): Record<Name, string> => {
  const names = Object.keys(schema) as Name[]
  return Object.fromEntries(names.map((name) => [name, ''])) as Record<Name, string>
}

/**
 * Состояние формы, проверка обязательных полей и отправка на сервер.
 *
 * Старый validate.js держал ошибки прямо в DOM: вешал класс `.error-mes` на
 * input и создавал qtip-подсказку императивно. Здесь ошибки — обычное
 * состояние React, а разметку по нему рисует компонент Field.
 */
export const useForm = <Name extends string>({ schema, endpoint, onSuccess }: Options<Name>) => {
  const initialValues = useMemo(() => buildInitialValues(schema), [schema])

  const [values, setValues] = useState<Record<Name, string>>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<Name, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<ApiResult | null>(null)

  const setValue = useCallback((name: Name, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    // Ошибка гаснет, как только поле начали править — как `_removeError` раньше.
    setErrors((current) => {
      if (current[name] === undefined) return current
      const { [name]: _removed, ...rest } = current
      return rest as Partial<Record<Name, string>>
    })
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setResult(null)
  }, [initialValues])

  const validate = useCallback((): boolean => {
    const found: Partial<Record<Name, string>> = {}

    for (const name of Object.keys(schema) as Name[]) {
      if (values[name].trim() === '') {
        found[name] = schema[name].required
      }
    }

    setErrors(found)
    return Object.keys(found).length === 0
  }, [schema, values])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (isSubmitting || !validate()) return

      setIsSubmitting(true)
      setResult(null)

      try {
        const response = await postJson(endpoint, values)
        setResult(response)
        if (response.ok) onSuccess?.(response)
      } catch {
        setResult({ ok: false, message: 'Сервер не отвечает. Попробуйте ещё раз.' })
      } finally {
        setIsSubmitting(false)
      }
    },
    [endpoint, isSubmitting, onSuccess, validate, values],
  )

  const getFieldProps = useCallback(
    (name: Name): FieldProps => ({
      name,
      value: values[name],
      error: errors[name],
      onChange: (value: string) => setValue(name, value),
    }),
    [errors, setValue, values],
  )

  return { values, errors, result, isSubmitting, getFieldProps, setValue, handleSubmit, reset }
}
