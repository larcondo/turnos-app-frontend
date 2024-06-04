import { useEffect, useState } from "react"
import { useSetRecoilState, useRecoilState } from "recoil"
import { errorState, requestedTurnsAtom } from "@states/atoms"

import turnosService from "@services/turnos"
import { CanchasDisponibles } from "@/types"

import CourtSection from "./CourtSection"

const TurnosSolicitados = () => {
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0,10))
  const [requestedTurns, setRequestedTurns] = useRecoilState(requestedTurnsAtom)
  const setError = useSetRecoilState(errorState)

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const data = await turnosService.getRequested(date);
  
        setRequestedTurns(data)
      } catch(err) {
        if (err instanceof Error) {
          setError({ title: err.name, message: err.message })
        } else {
          console.log(err)
        }
      }
    }

    void fetchTurnos()

  }, [date, setError, setRequestedTurns])

  const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDate(newDate)
  }

  const tc1 = requestedTurns.filter(t => t.cancha === CanchasDisponibles.Cancha1)
  const tc2 = requestedTurns.filter(t => t.cancha === CanchasDisponibles.Cancha2)
  const tc3 = requestedTurns.filter(t => t.cancha === CanchasDisponibles.Cancha3)
  const tc4 = requestedTurns.filter(t => t.cancha === CanchasDisponibles.Cancha4)

  return(
    <div className="p-10">
      <h1 className="text-2xl pb-4">Turnos Solicitados</h1>

      <input type="date" name="fecha" id="fecha" className="border border-teal-500 p-2 rounded-md" value={date} onChange={updateDate} />

      <CourtSection courtName="Cancha 1" turnArray={tc1} />

      <CourtSection courtName="Cancha 2" turnArray={tc2} />

      <CourtSection courtName="Cancha 3" turnArray={tc3} />

      <CourtSection courtName="Cancha 4" turnArray={tc4} />

    </div>
  )
}

export default TurnosSolicitados