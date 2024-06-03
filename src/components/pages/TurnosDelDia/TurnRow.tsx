import { TurnRecord } from '@/types'
import { useRecoilState  } from 'recoil'
import { dayInfo } from '@states/atoms'
import { BiLoaderAlt } from 'react-icons/bi'

import turnosService from '@services/turnos'
import { useState } from 'react'

// classes
const buttonNormal: string = 'bg-teal-500 p-4 rounded-md text-slate-50 hover:bg-teal-600'
const buttonDisabled: string = 'bg-teal-200 p-4 rounded-md text-teal-400'

// Props types
interface TurnoRowProps {
  turno: TurnRecord;
  onFailed: (err: Error) => void;
}

const TurnoRow = ({ turno, onFailed }: TurnoRowProps) => {
  const [info, setInfo] = useRecoilState(dayInfo)
  const [requesting, setRequesting] = useState<boolean>(false)

  if (!turno) return null
  if (!info) return null

  const solicitar = async () => {
    try {
      const id = turno.id
      setRequesting(true)
      const data = await turnosService.requestTurn(id)

      setInfo(curr => {
        const turnosArr = curr.turnos
        const turnos = turnosArr.map(t => {
          return (t.id === turno.id)
            ? { ...t, estado: data.estado, solicitadoPor: data.solicitadoPor }
            : t
        })
        return { ...curr, turnos }
      })

      setRequesting(false)
    } catch(err) {
      if (err instanceof Error) {
        onFailed(err)
      } else {
        console.log(err)
      }
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
      
      <div className='relative'>
        <button
          className={buttonClass}
          disabled={turno.estado !== 'disponible'}
          onClick={solicitar}
        >
          Solicitar
        </button>

        { requesting && 
          <div className=' absolute top-0 left-0 w-full h-full flex items-center justify-center'>
            <BiLoaderAlt size={24} className='animate-spin text-slate-50' />
          </div>
        }
      </div>
    </div>
  )
}

export default TurnoRow