import { turnos } from '@/data/turnos'

import TurnosTable from '@components/pages/Turnos/TurnosTable'

const TurnosDeUsuario = ({ username }: { username: string }) => {

  const myTurnos = turnos.filter( t => t.solicitadoPor === username)

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Mis turnos</h1>
      
      { myTurnos.length < 1
        ? <p className='text-center py-10'>No existen turnos disponibles para vos.</p>
        : <TurnosTable turnos={myTurnos} />
      }
    </div>
  )
}

export default TurnosDeUsuario