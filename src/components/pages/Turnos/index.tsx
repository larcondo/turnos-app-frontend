import { useRecoilState } from 'recoil'
import { userState } from '../../../states/atoms'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import turnosService from '../../../services/turnos';
import { CantidadPorFecha } from '../../../types';

import Calendar from '../../common/Calendar';

const Turnos = () => {
  const [year] = useState<string>(new Date().getFullYear().toString())
  const [month] = useState<string>((new Date().getMonth()+1).toString().padStart(2,'0'))
  const [turnos, setTurnos] = useState<CantidadPorFecha[]>()
  const [user] = useRecoilState(userState)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await turnosService.getQtyByYearMonth(`${year}-${month}`)
        setTurnos(res)
      } catch(err) {
        console.log(err)
      }
    }

    if (!user) {
      navigate('/login')
    } else {
      void fetchTurnos();
    }
  }, [user, navigate, month, year])

  return(
    <div className='p-10'>
      <p>{ user?.nombre }</p>
      <h1 className='text-2xl'>Turnos disponibles</h1>

      { turnos && <Calendar data={turnos} /> }
    </div>
  )
}

export default Turnos