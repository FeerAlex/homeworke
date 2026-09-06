import type { ApiResult } from '../types'

/**
 * Единственная точка общения с сервером — на месте трёх почти одинаковых
 * копий `_ajaxForm` из старых addProject.js / login.js / contact_me.js.
 */
export const postJson = async (endpoint: string, payload: unknown): Promise<ApiResult> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Запрос к ${endpoint} завершился со статусом ${response.status}`)
  }

  return (await response.json()) as ApiResult
}
