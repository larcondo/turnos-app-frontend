import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userState, userTurns, errorState } from '@states/atoms'
import { useEffect } from 'react'

import turnosService from '@services/turnos'

import TurnosTable from '@components/pages/Turnos/TurnosTable'

const TurnosDeUsuario = () => {
  const [user] = useRecoilState(userState)
  const [myTurns, setMyTurns] = useRecoilState(userTurns)
  const setError = useSetRecoilState(errorState)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const { turnos } = await turnosService.getByClient()
        setMyTurns(turnos)
        throw new Error('Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nulla quae molestias aut autem ab, accusantium cupiditate nemo eius animi.')
      } catch(err) {
        if (err instanceof Error) {
          setError({ title: err.name, message: err.message })
        } else {
          console.log(err)
        }
      }
    }

    if (!user) return navigate('/login')
    
    void fetchTurnos()

  }, [user, navigate, setMyTurns, setError])

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Mis turnos</h1>
      
      <TurnosTable turnos={myTurns} />
    </div>
  )
}

export default TurnosDeUsuario