import { useState } from 'react';

import TopNav from './components/TopNav/index';
import Turnos from './components/pages/Turnos/index';
import Solicitar from './components/pages/Solicitar/index';
import TurnosDeUsuario from './components/pages/TurnosDeUsuario';

const username: string = 'QuiGon';

function App() {
  const [page, setPage] = useState<string>('turnos');

  return (
    <main className='main-container'>
      <TopNav onClick={setPage} actualPage={page} />

      { page === 'turnos' && <Turnos /> }
      { page === 'solicitar' && <Solicitar /> }
      { page === 'misturnos' && <TurnosDeUsuario username={username} /> }
    </main>
  )
}

export default App