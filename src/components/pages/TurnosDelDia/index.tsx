import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { dayInfo, errorState } from '@states/atoms'
import { formattedDateString } from '@utils/formatting'

import turnosService from '@services/turnos'

import Loading from '@components/common/Loading'
import TurnoRow from './TurnRow'

const TurnosDelDia = () => {
  const [searchParams] = useSearchParams()
  const [info, setInfo] = useRecoilState(dayInfo)
  const setError = useSetRecoilState(errorState)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [cancha] = useState(searchParams.get('cancha'))
  const [fecha] = useState(searchParams.get('fecha'))

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (typeof cancha === 'string' && typeof fecha === 'string') {
          const data = await turnosService.getDaysTurns(fecha, cancha)
          setInfo(data)
          setTimeout(() => setIsLoading(false), 500)
        }
      } catch(err) {
        if (err instanceof Error) {
          setError({ title: err.name, message: err.message })
        } else {
          console.log(err)
        }
      }
    }
    
    void fetchInfo()
    
  }, [fecha, cancha, setInfo, setError])

  const onReqTurnFailed = (err: Error) => {
    setError({
      title: err.name,
      message: err.message
    })
  }

  if (isLoading) return <div className='flex justify-center pt-36'>
    <Loading />
  </div>

  return(
    <div className='p-10'>
      <h1 className='text-3xl'>{ cancha }</h1>
      <h2 className='text-xl text-center my-4'>{ formattedDateString(fecha as string, true) }</h2>
      <div className='grid grid-cols-1 gap-2 m-auto lg:w-3/6 md:w-4/6 sm:w-5/6'>
        { info.turnos.map(t => {
            return (
              <TurnoRow
                key={t.id}
                turno={t}
                onFailed={onReqTurnFailed}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default TurnosDelDia