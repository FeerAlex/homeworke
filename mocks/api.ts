import type { Connect, Plugin, ViteDevServer, PreviewServer } from 'vite'

/** Ответ, который отдаёт любой эндпоинт этого мока. */
export type ApiResult = {
  ok: boolean
  message: string
}

const DEMO_LOGIN = 'demo'
const DEMO_PASSWORD = 'demo12345'

/** Имитация сетевой задержки, чтобы состояние «отправляется…» было видно. */
const LATENCY_MS = 400

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const readJsonBody = async (req: Connect.IncomingMessage): Promise<Record<string, unknown>> => {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)

  if (chunks.length === 0) return {}

  try {
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

const handlers: Record<string, (body: Record<string, unknown>) => ApiResult> = {
  '/api/login': (body) => {
    const login = asString(body.login)
    const password = asString(body.password)

    return login === DEMO_LOGIN && password === DEMO_PASSWORD
      ? { ok: true, message: 'Вы вошли. Добро пожаловать!' }
      : { ok: false, message: 'Неверный логин или пароль.' }
  },

  '/api/projects': (body) => {
    const name = asString(body.name)

    return name === ''
      ? { ok: false, message: 'Ошибка! Невозможно добавить проект.' }
      : { ok: true, message: 'Ура! Проект успешно добавлен.' }
  },

  '/api/contact': (body) => {
    const email = asString(body.email)

    return email === ''
      ? { ok: false, message: 'Ошибка! Письмо не отправлено.' }
      : { ok: true, message: 'Спасибо! Я получил ваше письмо и скоро отвечу.' }
  },
}

const middleware: Connect.NextHandleFunction = (req, res, next) => {
  const path = (req.url ?? '').split('?')[0] ?? ''
  const handler = handlers[path]

  if (!handler) {
    next()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.end()
    return
  }

  void (async () => {
    const body = await readJsonBody(req)
    await delay(LATENCY_MS)

    const result = handler(body)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(result))
  })()
}

/**
 * Поднимает фейковый бэкенд прямо внутри Vite — на месте старых login.php
 * и add_project.php. Работает и в `npm run dev`, и в `npm run preview`.
 */
export const mockApi = (): Plugin => ({
  name: 'portfolio-mock-api',
  configureServer: (server: ViteDevServer) => {
    server.middlewares.use(middleware)
  },
  configurePreviewServer: (server: PreviewServer) => {
    server.middlewares.use(middleware)
  },
})
