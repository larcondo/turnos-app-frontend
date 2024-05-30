import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Turnos from './components/pages/Turnos'
import Login from './components/pages/Login'
import Solicitar from './components/pages/Solicitar'
import TurnosDeUsuario from './components/pages/TurnosDeUsuario'
import CantidadesDelDia from './components/pages/CantidadesDelDia'
import TurnosDelDia from './components/pages/TurnosDelDia'

const username: string = 'QuiGon';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        // path: '/turnos',
        element: <Turnos />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/turnos',
        element: <TurnosDelDia />,
      },
      {
        path: '/cantidades/:day',
        element: <CantidadesDelDia />,
      },
      {
        path: '/solicitar',
        element: <Solicitar />,
      },
      {
        path: '/misturnos',
        element: <TurnosDeUsuario username={username} />,
      }
    ]
  }
]);

export default router