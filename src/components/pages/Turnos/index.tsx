import { useRecoilState } from 'recoil'
import { userState } from '../../../states/atoms'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import turnosService from '../../../services/turnos';
import { TurnResponse } from '../../../types';

import TurnosTable from './TurnosTable';
import TurnosGrid from './TurnosGrid';

const Turnos = () => {
  const [turnos, setTurnos] = useState<TurnResponse>()
  const [user] = useRecoilState(userState)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        if (user?.accessToken) {
          const res = await turnosService.getAll(user.accessToken)
          console.log(res)
          setTurnos(res)
        }
      } catch(err) {
        console.log(err)
      }
    }

    if (!user) {
      navigate('/login')
    } else {
      void fetchTurnos();
    }
  }, [user, navigate])

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Turnos de hoy</h1>
      <p>{ user?.nombre }</p>
      { turnos?.turnos && <TurnosGrid turnos={turnos.turnos} />}
      { turnos?.turnos && <TurnosTable turnos={turnos.turnos} />}
    </div>
  )
}

export default Turnos