import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const BaseLayout = () => {
  return (
    <div>
      <Header />

      <div className="flex h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
