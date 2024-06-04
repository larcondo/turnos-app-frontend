import { useEffect, useState } from "react"

import turnosService from "@services/turnos"
import { CanchasDisponibles, TurnRequested } from "@/types"

import { LuClock, LuCalendarDays, LuUser, LuMail } from "react-icons/lu"

const TurnosSolicitados = () => {
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0,10))
  const [turnos, setTurnos] = useState<TurnRequested[]>([])

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const data = await turnosService.getRequested(date);
  
        setTurnos(data)
      } catch(err) {
        console.log(err)
      }
    }

    void fetchTurnos()

  }, [date])

  const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDate(newDate)
  }

  const tc1 = turnos.filter(t => t.cancha === CanchasDisponibles.Cancha1)
  const tc2 = turnos.filter(t => t.cancha === CanchasDisponibles.Cancha2)
  const tc3 = turnos.filter(t => t.cancha === CanchasDisponibles.Cancha3)
  const tc4 = turnos.filter(t => t.cancha === CanchasDisponibles.Cancha4)

  return(
    <div className="p-10">
      <h1 className="text-2xl pb-4">Turnos Solicitados</h1>

      <input type="date" name="fecha" id="fecha" className="border border-teal-500 p-2 rounded-md" value={date} onChange={updateDate} />

      <h2 className="text-xl py-2 mt-2">Cancha 1</h2>
      { tc1.length > 0 ?
          <div className="grid grid-cols-5 gap-2">
            { tc1.map( t => {
              return <TurnoCard turno={t} key={t.id} />
            })}
          </div>
        : <p className="text-sm">No hay turnos para confirmar.</p>
      }

      <h2 className="text-xl py-2 mt-2">Cancha 2</h2>
      { tc2.length > 0 ?
        <div className="grid grid-cols-5 gap-2">
          { tc2.map( t => {
            return <TurnoCard turno={t} key={t.id} />
          })}
        </div>
        : <p className="text-sm">No hay turnos para confirmar.</p>
      }

      <h2 className="text-xl py-2 mt-2">Cancha 3</h2>
      { tc3.length > 0 ?
        <div className="grid grid-cols-5 gap-2">
          { tc3.map( t => {
            return <TurnoCard turno={t} key={t.id} />
          })}
        </div>
        : <p className="text-sm">No hay turnos para confirmar.</p>
      }

      <h2 className="text-xl py-2 mt-2">Cancha 4</h2>
      { tc4.length > 0 ?
        <div className="grid grid-cols-5 gap-2">
          { tc4.map( t => {
            return <TurnoCard turno={t} key={t.id} />
          })}
        </div>
        : <p className="text-sm">No hay turnos para confirmar.</p>
      }

      

    </div>
  )
}

interface TurnoCardProps {
  turno: TurnRequested;
}

const TurnoCard = ({ turno }: TurnoCardProps) => {
  return(
    <div className="border border-gray-300 rounded p-2 shadow-md">
      <p className="flex items-center text-sm text-teal-900"><LuCalendarDays /><span className="truncate pl-2">{ turno.fecha }</span></p>
      <p className="flex items-center text-sm text-teal-900"><LuClock /><span className="truncate pl-2">{ turno.inicio } a { turno.fin } hs</span></p>
      <p className="flex items-center text-sm text-teal-900"><LuUser /><span className="truncate pl-2">{ turno.nombre }</span></p>
      <p className="flex items-center text-sm text-teal-900"><LuMail /><span className="truncate pl-2">{ turno.email }</span></p>
      <p className="text-sm my-2">{ turno.estado } - { turno.cancha }</p>
      <button className="bg-teal-700 w-full rounded py-1 mt-2 text-teal-100">Confirmar</button>
    </div>
  )
}

export default TurnosSolicitados