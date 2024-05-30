import { CantidadPorFecha } from "@/types"
import { MAX_TURNS_PER_DAY } from "@/contants";
import { Link } from "react-router-dom";

interface DaySquareProps {
  dateValue: string;
  turnos: CantidadPorFecha[];
}

const DaySquare = ({ dateValue, turnos }: DaySquareProps) => {
  if (!turnos) return null
  
  const dayNum = dateValue.split('-')[2]
  const turnosDisponibles = turnos.find(d => d.fecha === dateValue)?.cantidad || 0
  let divClass = ''
  let dayNumClass = ''

  // 3, 6, 9 10
  switch (true) {
    case turnosDisponibles < (1):
      divClass = 'flex flex-col justify-start bg-gray-50 aspect-square rounded border-2 border-gray-100 cursor-pointer'
      dayNumClass = 'text-xs pb-0.5 px-2 text-gray-300 bg-gray-100'
      break;
    case turnosDisponibles < (0.3*MAX_TURNS_PER_DAY):
      divClass = 'flex flex-col justify-start bg-teal-300/40 aspect-square rounded border-2 border-teal-300/25 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/40'
      break;
    case turnosDisponibles < (0.6*MAX_TURNS_PER_DAY):
      divClass = 'flex flex-col justify-start bg-teal-300/50 aspect-square rounded border-2 border-teal-300/50 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/50'
      break;
    case turnosDisponibles < (0.9*MAX_TURNS_PER_DAY):
      divClass = 'flex flex-col justify-start bg-teal-300/75 aspect-square rounded border-2 border-teal-300/75 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/75'
      break;
    default:
      divClass = 'flex flex-col justify-start bg-teal-300 aspect-square rounded border-2 border-teal-400 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-400'
  }

  // const divClass: string = turnosDisponibles > 0
  //   ? 'flex flex-col justify-start bg-teal-200 aspect-square rounded border-2 border-teal-300 cursor-pointer hover:bg-teal-200/70'
  //   : 'flex flex-col justify-start bg-gray-100 aspect-square rounded border-2 cursor-pointer'

  // const dayNumClass: string = turnosDisponibles > 0
  //   ? 'text-xs px-2 text-teal-600 bg-teal-300'
  //   : 'text-xs px-2 text-teal-600 bg-gray-200';
  
  return(
    <Link to={`/cantidades/${dateValue}`}>
      <div className={divClass}>
        <p className={dayNumClass}>{ dayNum }</p>
        <div className='flex flex-col justify-center flex-1'>
        { turnosDisponibles > 0
            ? <>
                <p className='text-sm text-center font-semibold text-teal-600'>{ turnosDisponibles }</p>
                <p className='text-xs text-center text-gray-600 text-teal-500'>turnos</p>
              </>
            : <p className='text-xs text-center text-gray-300'>Sin turnos disponibles</p>
        }
        </div>
        
      </div>
    </Link>
  )
}

export default DaySquare