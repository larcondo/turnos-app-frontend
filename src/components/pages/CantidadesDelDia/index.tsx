import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { dayTurnsQty, errorState } from '@states/atoms'
import { formattedDateString } from '@utils/formatting'

import turnosService from '@services/turnos'
import CantidadesGrid from './CantidadesGrid'

const Loading = () => <p>Loading...</p>

const CantidadesDelDia = () => {
  const [cantidades, setCantidades] = useRecoilState(dayTurnsQty)
  const [loading, setLoading] = useState<boolean>(true)
  const setError = useSetRecoilState(errorState)
  const { fecha } = useParams()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        if (typeof fecha === 'string') {
          const data = await turnosService.countByDate(fecha)
          setCantidades(data)
          setLoading(false)
        }  
      } catch(err) {
        if (err instanceof Error) {
          setError({ title: err.name, message: err.message })
        } else {
          console.log(err)
        }
      }
    }
    
    void fetchTurnos()
  }, [fecha, setCantidades, setError])

  if (loading) return <Loading />

  return(
    <div className='p-10 min-h-screen'>
      <h1 className='text-2xl'>Turnos disponibles</h1>
      <p className='text-center my-4'>{ formattedDateString(fecha as string) }</p>
      <CantidadesGrid cant={cantidades} day={fecha as string} />
    </div>
  )
}

export default CantidadesDelDia