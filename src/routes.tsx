import { createBrowserRouter } from 'react-router-dom'
import { BaseLayout } from './components/layout'
import { Home } from './pages/home'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [{ index: true, element: <Home /> }],
  },
])
