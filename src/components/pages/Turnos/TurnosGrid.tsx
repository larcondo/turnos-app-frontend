import { TurnRecord } from "../../../types"
const TurnosGrid = ({ turnos }: { turnos: TurnRecord[]}) => {
  if (!turnos || turnos.length < 1) return null
  
  return(
    <div className="grid grid-cols-4 border-2">
      { turnos.map(t => {
        return <div key={t.id} className="flex flex-col items-center">
          <p className="text-base font-semibold">{ t.cancha }</p>
          <p className="text-sm">{ t.fecha }</p>
          <p className="text-sm">de { t.inicio } a { t.fin } hs</p>
          <p className="text-sm">{ t.estado }</p>
        </div>
      }) }
    </div>
  )
}

export default TurnosGrid