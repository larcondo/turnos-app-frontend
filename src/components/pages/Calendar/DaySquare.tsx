const fakeValues = [
  { fecha: '2024-05-01', cantidad: 3 },
  { fecha: '2024-05-02', cantidad: 9 },
  { fecha: '2024-05-03', cantidad: 3 },
  { fecha: '2024-05-04', cantidad: 7 },
  { fecha: '2024-05-05', cantidad: 7 },
  { fecha: '2024-05-06', cantidad: 0 },
  { fecha: '2024-05-07', cantidad: 8 },
  { fecha: '2024-05-08', cantidad: 2 },
  { fecha: '2024-05-09', cantidad: 5 },
  // { fecha: '2024-05-10', cantidad: 2 },
  // { fecha: '2024-05-11', cantidad: 6 },
  // { fecha: '2024-05-12', cantidad: 7 },
  // { fecha: '2024-05-13', cantidad: 0 },
  // { fecha: '2024-05-14', cantidad: 7 },
  // { fecha: '2024-05-15', cantidad: 7 },
  // { fecha: '2024-05-16', cantidad: 3 },
  // { fecha: '2024-05-17', cantidad: 4 },
  { fecha: '2024-05-18', cantidad: 2 },
  { fecha: '2024-05-19', cantidad: 3 },
  // { fecha: '2024-05-20', cantidad: 8 },
  // { fecha: '2024-05-21', cantidad: 5 },
  // { fecha: '2024-05-22', cantidad: 6 },
  // { fecha: '2024-05-23', cantidad: 6 },
  // { fecha: '2024-05-24', cantidad: 5 },
  // { fecha: '2024-05-25', cantidad: 0 },
  // { fecha: '2024-05-26', cantidad: 3 },
  // { fecha: '2024-05-27', cantidad: 9 },
  // { fecha: '2024-05-28', cantidad: 7 },
  // { fecha: '2024-05-29', cantidad: 4 },
  // { fecha: '2024-05-30', cantidad: 0 },
  // { fecha: '2024-05-31', cantidad: 2 }
]

interface DaySquareProps {
  dateValue: string;
}

const DaySquare = ({ dateValue }: DaySquareProps) => {
  const dayNum = dateValue.split('-')[2]
  const turnosDisponibles = fakeValues.find(d => d.fecha === dateValue)?.cantidad || 0
  let divClass = ''
  let dayNumClass = ''

  // 3, 6, 9 10
  switch (true) {
    case turnosDisponibles < 1:
      divClass = 'flex flex-col justify-start bg-gray-50 aspect-square rounded border-2 border-gray-100 cursor-pointer'
      dayNumClass = 'text-xs pb-0.5 px-2 text-gray-300 bg-gray-100'
      break;
    case turnosDisponibles < 3:
      divClass = 'flex flex-col justify-start bg-teal-300/40 aspect-square rounded border-2 border-teal-300/25 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/40'
      break;
    case turnosDisponibles < 6:
      divClass = 'flex flex-col justify-start bg-teal-300/50 aspect-square rounded border-2 border-teal-300/50 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/50'
      break;
    case turnosDisponibles < 9:
      divClass = 'flex flex-col justify-start bg-teal-300/75 aspect-square rounded border-2 border-teal-300/75 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300/75'
      break;
    default:
      divClass = 'flex flex-col justify-start bg-teal-300 aspect-square rounded border-2 border-teal-300 cursor-pointer hover:border-teal-500'
      dayNumClass = 'text-xs pb-0.5 px-2 text-teal-600 bg-teal-300'
  }

  // const divClass: string = turnosDisponibles > 0
  //   ? 'flex flex-col justify-start bg-teal-200 aspect-square rounded border-2 border-teal-300 cursor-pointer hover:bg-teal-200/70'
  //   : 'flex flex-col justify-start bg-gray-100 aspect-square rounded border-2 cursor-pointer'

  // const dayNumClass: string = turnosDisponibles > 0
  //   ? 'text-xs px-2 text-teal-600 bg-teal-300'
  //   : 'text-xs px-2 text-teal-600 bg-gray-200';
  
  return(
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
  )
}

export default DaySquare