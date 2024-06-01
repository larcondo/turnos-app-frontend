import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { dayTurnsQty } from '@/states/atoms'

import turnosService from '@services/turnos'
import CantidadesGrid from './CantidadesGrid'

const Loading = () => <p>Loading...</p>

const CantidadesDelDia = () => {
  const [cantidades, setCantidades] = useRecoilState(dayTurnsQty)
  const [loading, setLoading] = useState<boolean>(true)
  const { day } = useParams()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        if (typeof day === 'string') {
          const data = await turnosService.countByDate(day)
          setCantidades(data)
          setLoading(false)
        }  
      } catch(err) {
        console.log(err)
      }
    }
    
    void fetchTurnos()
  }, [day, setCantidades])

  if (loading) return <Loading />

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Turnos disponibles</h1>
      <p>{ day }</p>
      <CantidadesGrid cant={cantidades} day={day as string} />
    </div>
  )
}

export default CantidadesDelDia