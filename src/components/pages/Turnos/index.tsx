import { useRecoilState, useSetRecoilState } from 'recoil'
import { userState, dailyQtyForMonth, errorState } from '@states/atoms';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import turnosService from '@services/turnos';

import Loading from '@components/common/Loading';
import Calendar from '@components/common/Calendar';

const Turnos = () => {
  const [year] = useState<string>(new Date().getFullYear().toString())
  const [month] = useState<string>((new Date().getMonth()+1).toString().padStart(2,'0'))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [cantidades, setCantidades] = useRecoilState(dailyQtyForMonth)
  const [user] = useRecoilState(userState)
  const setError = useSetRecoilState(errorState)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const data = await turnosService.getQtyByYearMonth(`${year}-${month}`)
        setCantidades(data)
        setTimeout(() => setIsLoading(false), 500)
      } catch(err) {
        if (err instanceof Error) {
          setError({ title: err.name, message: err.message })
        } else {
          console.log(err)
        }
      }
    }

    if (!user) return navigate('/login')

    void fetchTurnos();

  }, [user, navigate, month, year, setCantidades, setError])

  if (isLoading) return <div className='flex justify-center pt-36'>
    <Loading />
  </div>

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Turnos disponibles</h1>
      <p>{ user?.nombre } { user?.rol ? `(${user.rol})` : null }</p>

      <Calendar data={cantidades} year={year} month={month} />
    </div>
  )
}

export default Turnos