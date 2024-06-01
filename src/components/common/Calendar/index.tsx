import { CantidadPorFecha } from "@/types"
import DaySquare from "./DaySquare";

interface CalendarProps {
  data: CantidadPorFecha[];
  year: string;
  month: string;
}

const Calendar = ({ data, year, month }: CalendarProps) => {
  const headerClass: string = 'text-center text-sm font-semibold';

  const fecha: string = `${year}-${month}`;

  const spanVariants: Array<string|null> = [
    'col-span-6',
    null,
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
  ];

  const generateDaysArray = (f: string) => {
    const y = f.split('-')[0];
    const m = f.split('-')[1];
    const inicio = new Date(Number(y), Number(m)-1, 1);
    const fin = new Date(Number(y), Number(m), 0);

    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    return {
      days: [...Array(fin.getDate()).keys()],
      span: inicio.getDay(),
      title: `${months[inicio.getMonth()]} de ${y}`
    }
  }

  const daysArray = generateDaysArray(fecha)

  return(
    <div className='grid grid-cols-7 gap-1 my-10 mx-auto w-3/5'>
      <div className='col-span-full text-center'>{ daysArray.title }</div>

      <div className={headerClass}>Lunes</div>
      <div className={headerClass}>Martes</div>
      <div className={headerClass}>Miercoles</div>
      <div className={headerClass}>Jueves</div>
      <div className={headerClass}>Viernes</div>
      <div className={headerClass}>Sabado</div>
      <div className={headerClass}>Domingo</div>

      { spanVariants[daysArray.span] && <div className={`${spanVariants[daysArray.span]}`}></div> }
      
      {
        daysArray.days.map( d => {
          return <DaySquare
            key={d}
            dateValue={`${fecha}-${(d+1).toString().padStart(2,'0')}`}
            turnos={data}  
          />
        })
      }
    </div>
  )
}

export default Calendar