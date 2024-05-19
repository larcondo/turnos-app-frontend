import { turnos } from '../../../data/turnos';
import { TurnRecord } from '../../../types';
import TurnosTable from './TurnosTable';

const Turnos = () => {

  const sortedTurnos = turnos.sort((a: TurnRecord, b: TurnRecord) => a.cancha.localeCompare(b.cancha))

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Turnos de hoy</h1>
      <TurnosTable turnos={sortedTurnos} />
    </div>
  )
}

export default Turnos