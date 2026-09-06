/** Ответ любого эндпоинта мок-бэкенда (см. mocks/api.ts). */
export type ApiResult = {
  ok: boolean
  message: string
}

/** Карточка работы в разделе «Мои работы». */
export type Project = {
  id: string
  title: string
  url: string
  /** Что показать в подписи-ссылке под картинкой. */
  urlLabel: string
  description: string
  image: string
}
