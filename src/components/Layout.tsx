import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import styles from './Layout.module.css'

/** Шапка, сайдбар и подвал — общая рамка для всех страниц, кроме входа. */
export const Layout = () => (
  <>
    <Header />
    <main className={styles.content}>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
)
