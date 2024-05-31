import { TurnRecord } from '@/types'
import { useRecoilState  } from 'recoil'
import { dayInfo } from '@/states/atoms'

import turnosService from '@services/turnos'

// classes
const buttonNormal: string = 'bg-teal-500 p-4 rounded-md text-slate-50 hover:bg-teal-600'
const buttonDisabled: string = 'bg-teal-200 p-4 rounded-md text-teal-400'

// Props types
interface TurnoRowProps {
  turno: TurnRecord;
}

const TurnoRow = ({ turno }: TurnoRowProps) => {
  const [info, setInfo] = useRecoilState(dayInfo)

  if (!turno) return null
  if (!info) return null

  const solicitar = async () => {
    try {
      const id = turno.id
      const data = await turnosService.requestTurn(id)

      setInfo(curr => {
        if(curr === null) return null
        
        const turnosArr = curr.turnos
        const turnos = turnosArr.map(t => {
          return (t.id === turno.id)
            ? { ...t, estado: data.estado, solicitadoPor: data.solicitadoPor }
            : t
        })
        return { ...curr, turnos }
      })
    } catch(err) {
      console.log(err)
    }
  }

  const buttonClass = turno.estado === 'disponible'
    ? buttonNormal
    : buttonDisabled

  const timeClass = turno.estado === 'disponible'
    ? 'text-xl font-semibold text-teal-700'
    : 'text-xl font-semibold text-teal-400'

  const estadoClass = turno.estado === 'disponible'
    ? 'text-base text-teal-600'
    : 'text-base text-teal-400'

  return(
    <div className='bg-teal-100 py-4 px-6 rounded-md flex justify-between items-center'>
      <p className={timeClass}>{ turno.inicio } a { turno.fin } hs</p>
      <p className={estadoClass}>{ turno.estado }</p>
      <div>
        <button
          className={buttonClass}
          disabled={turno.estado !== 'disponible'}
          onClick={solicitar}
        >
          Solicitar
        </button>
      </div>
    </div>
  )
}

export default TurnoRow