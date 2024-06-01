import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { dayInfo } from '@/states/atoms'

import turnService from '@services/turnos'

import TurnoRow from './TurnRow'

const TurnosDelDia = () => {
  const [searchParams] = useSearchParams()
  const [info, setInfo] = useRecoilState(dayInfo)
  const [cancha] = useState(searchParams.get('cancha'))
  const [fecha] = useState(searchParams.get('fecha'))

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (typeof cancha === 'string' && typeof fecha === 'string') {
          const data = await turnService.getDaysTurns(fecha, cancha)
          setInfo(data)
        }
      } catch(err) {
        console.log(err)
      }
    }
    
    void fetchInfo()
    
  }, [fecha, cancha, setInfo])

  return(
    <div className='p-10'>
      <h1 className='text-3xl'>{ cancha }</h1>
      <h2 className='text-xl'>{ fecha }</h2>
      <div className='grid grid-cols-1 gap-2 m-auto lg:w-3/6 md:w-4/6 sm:w-5/6'>
        { info.turnos.map(t => {
            return <TurnoRow key={t.id} turno={t} />
          })
        }
      </div>
    </div>
  )
}

export default TurnosDelDia