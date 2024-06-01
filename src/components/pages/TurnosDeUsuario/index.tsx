import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState, userTurns } from '@/states/atoms'
import { useEffect } from 'react'

import turnosService from '@services/turnos'

import TurnosTable from '@components/pages/Turnos/TurnosTable'

const TurnosDeUsuario = () => {
  const [user] = useRecoilState(userState)
  const [myTurns, setMyTurns] = useRecoilState(userTurns)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const { turnos } = await turnosService.getByClient()
        setMyTurns(turnos)
      } catch(err) {
        console.log(err)
      }
    }

    if (!user) return navigate('/login')
    
    void fetchTurnos()

  }, [user, navigate, setMyTurns])

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Mis turnos</h1>
      
      <TurnosTable turnos={myTurns} />
    </div>
  )
}

export default TurnosDeUsuario