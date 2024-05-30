import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import turnosService, { CountGroup } from '@services/turnos'

const CantidadesDelDia = () => {
  const [cantidades, setCantidades] = useState<CountGroup[]>([])
  const { day } = useParams()

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        if (typeof day === 'string') {
          const res = await turnosService.countByDate(day)
          setCantidades(res)
        }  
      } catch(err) {
        console.log(err)
      }
    }

    void fetchTurnos()
  }, [day])

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Turnos disponibles</h1>
      <p>{ day }</p>
      <CantidadesGrid cant={cantidades} day={day as string} />
    </div>
  )
}

const CantidadesGrid = ({ cant, day }: { cant: CountGroup[], day: string }) => {
  if (cant.length < 1) return null

  const containerClass = 'grid grid-cols-2 gap-6 w-96 m-auto'
  const cantBlockClass = 'p-6 bg-teal-300 flex flex-col items-center rounded'

  return(
    <div className={containerClass}>
      { cant.map( g => {
          return <Link to={`/turnos?cancha=${g.cancha}&fecha=${day}`} key={g.cancha} className={cantBlockClass}>
            <p className='text-lg font-semibold mb-4'>{ g.cancha }</p>
            <p className='text-sm'><span className='font-bold'>{ g.cantidad }</span> turnos</p>
            <p className='text-sm'>disponibles</p>
          </Link>
        })
      }
    </div>
  )
}


export default CantidadesDelDia