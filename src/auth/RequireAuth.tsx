import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './context'

/**
 * Пускает дальше только с открытой сессией. Анонима отправляет на форму входа
 * и запоминает, куда он шёл, — после входа его вернут туда же.
 */
export const RequireAuth = () => {
  const { user } = useAuth()
  const location = useLocation()

  if (user === null) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  return <Outlet />
}
