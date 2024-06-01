import { Link } from 'react-router-dom'
import { MAX_TURNS_PER_DAY } from '@/contants';

const linkClasses = [
  'flex flex-col justify-start bg-teal-300/40 aspect-square rounded border-2 border-teal-300/25 cursor-pointer hover:border-teal-500',
  'flex flex-col justify-start bg-teal-300/50 aspect-square rounded border-2 border-teal-300/50 cursor-pointer hover:border-teal-500',
  'flex flex-col justify-start bg-teal-300/75 aspect-square rounded border-2 border-teal-300/75 cursor-pointer hover:border-teal-500',
  'flex flex-col justify-start bg-teal-300 aspect-square rounded border-2 border-teal-400 cursor-pointer hover:border-teal-500',
]

const dayNumberClasses = [
  'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/40 select-none',
  'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/50 select-none',
  'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/75 select-none',
  'text-xs pb-0.5 px-2 text-teal-600 bg-teal-400 select-none',
]

interface SquareWithTurnsProps {
  date: string;
  dayNumber: string;
  quantity: number;
}

const SquareWithTurns = ({ date, dayNumber, quantity }: SquareWithTurnsProps) => {

  const classIndex = (value: number) => {
    let index = 0;
    switch (true) {
      case value < (0.3*MAX_TURNS_PER_DAY):
        index = 0;
        break;
      case value < (0.6*MAX_TURNS_PER_DAY):
        index = 1;
        break;
      case value < (0.9*MAX_TURNS_PER_DAY):
        index = 2;
        break;
      default:
        index = 3;
    }
    return index;
  }

  const index = classIndex(quantity)

  return(
    <Link to={`/cantidades/${date}`} className={linkClasses[index]}>
      <p className={dayNumberClasses[index]}>{ dayNumber }</p>
      <div className='flex flex-col justify-center flex-1'>
        <p className='text-sm text-center font-semibold text-teal-600 select-none'>
          { quantity }
        </p>
        <p className='text-xs text-center text-gray-600 text-teal-500 select-none'>
          turnos
        </p>
      </div>
    </Link>
  )
}

export default SquareWithTurns