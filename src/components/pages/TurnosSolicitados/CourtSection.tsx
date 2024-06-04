import { useSetRecoilState } from "recoil";
import { errorState } from "@/states/atoms";
import { TurnRequested } from "@/types";

import TurnoCard from "./TurnoCard";

interface CourtSectionProps {
  courtName: string;
  turnArray: TurnRequested[];
}

const CourtSection = ({ courtName, turnArray }: CourtSectionProps) => {
  const setError = useSetRecoilState(errorState)
  
  const onConfirmFailed = (err: Error) => {
    setError({ title: err.name, message: err.message })
  }
  
  if (turnArray.length < 1) return <>
    <h2 className="text-xl py-2 mt-2">{ courtName }</h2>
    <p className="text-sm">No hay turnos para confirmar.</p>
  </>
  
  return(
    <>
      <h2 className="text-xl py-2 mt-2">{ courtName }</h2>
      <div className="grid grid-cols-5 gap-2">
        { turnArray.map( t => {
          return(
            <TurnoCard
              turno={t}
              key={t.id}
              onFailed={onConfirmFailed}
            />
          )
        })}
      </div>
    </>
  )
}

export default CourtSection