import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userState, userTurns, errorState } from '@states/atoms'
import { useEffect, useState } from 'react'
import { autoLoginCookie } from '@utils/cookies'

import turnosService from '@services/turnos'

import TurnosTable from '@components/pages/Turnos/TurnosTable'
import Loading from '@components/common/Loading'

const TurnosDeUsuario = () => {
  const [user] = useRecoilState(userState)
  const [myTurns, setMyTurns] = useRecoilState(userTurns)
  const setError = useSetRecoilState(errorState)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const { turnos } = await turnosService.getByClient()
        setMyTurns(turnos)
        setTimeout(() => setIsLoading(false), 500)
      } catch(err) {
        if (err instanceof Error) {
          setError({ title: err.name, message: err.message })
        } else {
          console.log(err)
        }
      }
    }

    if (!autoLoginCookie()) return navigate('/login')
    
    void fetchTurnos()

  }, [user, navigate, setMyTurns, setError])

  if (isLoading) return <div className='flex justify-center pt-36'>
    <Loading />
  </div>

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Mis turnos</h1>
      
      <TurnosTable turnos={myTurns} />
    </div>
  )
}

export default TurnosDeUsuario