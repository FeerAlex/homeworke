import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from './auth/AuthProvider'
import { RequireAuth } from './auth/RequireAuth'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { ProjectsPage } from './pages/ProjectsPage'

/**
 * Четыре html-файла превратились в четыре маршрута. Переход между разделами
 * больше не перезагружает страницу и не тянет шапку с сайдбаром заново.
 *
 * Открыта только форма входа: всё остальное закрыто RequireAuth.
 */
export const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route index element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Route>

        {/* Единственный открытый маршрут. Без шапки и сайдбара — как и раньше. */}
        <Route path="login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
