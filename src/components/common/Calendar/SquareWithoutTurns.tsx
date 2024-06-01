const divClass = 'flex flex-col justify-start bg-gray-50 aspect-square rounded border-2 border-gray-100'
const dayNumberClass = 'text-xs pb-0.5 px-2 text-gray-300 bg-gray-100 select-none'

interface SquareWithoutTurnsProps {
  dayNumber: string;
}

const SquareWithoutTurns = ({ dayNumber }: SquareWithoutTurnsProps) => {
  return(
    <div className={divClass}>
      <p className={dayNumberClass}>{ dayNumber }</p>
      <div className='flex flex-col justify-center flex-1'>
        <p className='text-xs text-center text-gray-300 select-none'>Sin turnos disponibles</p>
      </div>
    </div>
  )
}

export default SquareWithoutTurns