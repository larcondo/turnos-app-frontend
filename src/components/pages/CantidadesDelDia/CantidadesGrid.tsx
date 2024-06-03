import { Link } from 'react-router-dom'
import { CountGroup } from '@services/turnos'

const containerClass = 'grid grid-cols-2 gap-6 w-96 m-auto animate-appear'
const cantBlockClass = 'p-6 bg-teal-300 flex flex-col items-center rounded'

const CantidadesGrid = ({ cant, day }: { cant: CountGroup[], day: string }) => {

  if (cant.length < 1) return null

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

export default CantidadesGrid