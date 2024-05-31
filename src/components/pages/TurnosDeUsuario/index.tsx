import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '@/states/atoms'
import { useEffect, useState } from 'react'
import { TurnRecord } from '@/types'

import turnosService from '@services/turnos'

import TurnosTable from '@components/pages/Turnos/TurnosTable'

const TurnosDeUsuario = () => {
  const [user] = useRecoilState(userState)
  const [turnos, setTurnos] = useState<TurnRecord[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await turnosService.getByClient()
        if (res.turnos) {
          setTurnos(res.turnos)
        }
      } catch(err) {
        console.log(err)
      }
    }

    if (!user) {
      navigate('/login')
    } else {
      void fetchTurnos()
    }
  }, [user, navigate])

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Mis turnos</h1>
      
      { turnos.length < 1
        ? <p className='text-center py-10'>No existen turnos disponibles para vos.</p>
        : <TurnosTable turnos={turnos} />
      }
    </div>
  )
}

export default TurnosDeUsuario