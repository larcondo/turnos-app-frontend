import { CantidadPorFecha } from "@/types"

import SquareWithTurns from "./SquareWithTurns";
import SquareWithoutTurns from "./SquareWithoutTurns";

interface DaySquareProps {
  dateValue: string;
  turnos: CantidadPorFecha[];
}

const DaySquare = ({ dateValue, turnos }: DaySquareProps) => {
  if (!turnos) return null
  
  const dayNum = dateValue.split('-')[2]
  const turnosDisponibles = turnos.find(d => d.fecha === dateValue)?.cantidad || 0

  return(
    (turnosDisponibles > 0)
      ? <SquareWithTurns
        date={dateValue}
        dayNumber={dayNum}
        quantity={turnosDisponibles}
      />
      : <SquareWithoutTurns dayNumber={dayNum} />
  )
}

export default DaySquare