import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { TurnRecord, TurnResponse } from "../../../types"

import turnService from '../../../services/turnos'

const TurnosDelDia = () => {
  const [searchParams] = useSearchParams()
  const [dayInfo, setDayInfo] = useState<TurnResponse>()
  const [cancha] = useState(searchParams.get('cancha'))
  const [fecha] = useState(searchParams.get('fecha'))

  useEffect(() => {
    const fetchInfo = async () => {
      // const cancha = searchParams.get('cancha') 
      // const fecha = searchParams.get('fecha')
    
      try {
        if (typeof cancha === 'string' && typeof fecha === 'string') {
          const res = await turnService.getDaysTurns(fecha, cancha)
          setDayInfo(res)
        }
      } catch(err) {
        console.log(err)
      }
    }
    
    void fetchInfo()
    
  }, [fecha, cancha])

  return(
    <div className='p-10'>
      <h1 className='text-3xl'>{ cancha }</h1>
      <h2 className='text-xl'>{ fecha }</h2>
      <div className='grid grid-cols-1 gap-2 m-auto lg:w-3/6 md:w-4/6 sm:w-5/6'>
        { dayInfo && dayInfo.turnos &&
          dayInfo.turnos.map(t => {
            return <TurnoRow key={t.id} turno={t} />
          })
        }
      </div>
    </div>
  )
}


const TurnoRow = ({ turno }: { turno: TurnRecord }) => {
  if (!turno) return null

  const buttonClass = turno.estado === 'disponible'
    ? 'bg-teal-500 p-4 rounded-md text-slate-50'
    : 'bg-teal-200 p-4 rounded-md text-teal-400'

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
        <button className={buttonClass} disabled={turno.estado !== 'disponible'}>Solicitar</button>
      </div>
    </div>
  )
}

export default TurnosDelDia