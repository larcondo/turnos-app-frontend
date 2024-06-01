import { useRecoilState } from 'recoil'
import { dailyQtyForMonth } from '@/states/atoms';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userState } from '@/states/atoms';

import turnosService from '@services/turnos';

import Calendar from '../../common/Calendar';

const Turnos = () => {
  const [year] = useState<string>(new Date().getFullYear().toString())
  const [month] = useState<string>((new Date().getMonth()+1).toString().padStart(2,'0'))
  const [cantidades, setCantidades] = useRecoilState(dailyQtyForMonth)
  const [user] = useRecoilState(userState)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const data = await turnosService.getQtyByYearMonth(`${year}-${month}`)
        setCantidades(data)
      } catch(err) {
        console.log(err)
      }
    }

    if (!user) return navigate('/login')

    void fetchTurnos();

  }, [user, navigate, month, year, setCantidades])

  return(
    <div className='p-10'>
      <p>{ user?.nombre }</p>
      <p>Rol: { user?.rol }</p>
      <h1 className='text-2xl'>Turnos disponibles</h1>

      <Calendar data={cantidades} />
    </div>
  )
}

export default Turnos