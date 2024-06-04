import turnosService from "@services/turnos"
import { useSetRecoilState } from "recoil";
import { requestedTurnsAtom } from "@/states/atoms";
import { TurnRequested } from "@/types";
import { LuClock, LuCalendarDays, LuUser, LuMail } from "react-icons/lu"

interface TurnoCardProps {
  turno: TurnRequested;
  onFailed: (err: Error) => void;
}

const TurnoCard = ({ turno, onFailed }: TurnoCardProps) => {
  const setRequestedturns = useSetRecoilState(requestedTurnsAtom)

  const confirmarTurno = async () => {
    try {
      const id = turno.id
      const data = await turnosService.confirmTurn(id)
      setRequestedturns((curr) => {
        const updated = curr.filter(t => t.id !== data.id)
        return updated
      })
    } catch(err) {
      if (err instanceof Error) {
        onFailed(err)
      } else {
        console.log(err)
      }
    }
  }

  return(
    <div className="border border-gray-300 rounded p-2 shadow-md">
      <p className="flex items-center text-sm text-teal-900"><LuCalendarDays /><span className="truncate pl-2">{ turno.fecha }</span></p>
      <p className="flex items-center text-sm text-teal-900"><LuClock /><span className="truncate pl-2">{ turno.inicio } a { turno.fin } hs</span></p>
      <p className="flex items-center text-sm text-teal-900"><LuUser /><span className="truncate pl-2">{ turno.nombre }</span></p>
      <p className="flex items-center text-sm text-teal-900"><LuMail /><span className="truncate pl-2">{ turno.email }</span></p>
      <p className="text-sm my-2">{ turno.estado } - { turno.cancha }</p>
      <button
        className="bg-teal-700 w-full rounded py-1 mt-2 text-teal-100"
        onClick={confirmarTurno}
      >
        Confirmar
      </button>
    </div>
  )
}

export default TurnoCard