import { TurnRecord } from '../../../types'

const tableClass: string = 'table-auto mx-auto my-5';


const TurnosTable = ({ turnos }: { turnos: TurnRecord[]}) => {

  if (!turnos || turnos.length < 1) return null

  return(
    <table className={tableClass}>
      <tbody>
        <TableHeader />
        { turnos.map( t => <TableRow key={t.id} turno={t} /> )}
      </tbody>
    </table>
  )
}

const TableHeader = () => {
  return(
    <tr>
      <th>Cancha</th>
      <th>Fecha</th>
      <th>Inicio</th>
      <th>Fin</th>
      <th>Estado</th>
      <th>Solicitó</th>
    </tr>
  )
}

const TableRow = ({ turno }: { turno: TurnRecord }) => {
  // const tdClass: string = `px-8 py-2 text-sm text-gray-${turno.estado === 'disponible' ? '900' : '500'}`;
  const tdClass: string = `px-8 py-2 text-sm ${turno.estado === 'disponible' ? 'text-gray-900' : 'text-gray-400'}`;

  return(
    <tr>
      <td className={tdClass}>{ turno.cancha }</td>
      <td className={tdClass}>{ turno.fecha }</td>
      <td className={tdClass}>{ turno.inicio }</td>
      <td className={tdClass}>{ turno.fin }</td>
      <td className={tdClass}>{ turno.estado }</td>
      <td className={tdClass}>{ turno.solicitadoPor?.substring(0, 8) }...</td>
    </tr>
  )
}

export default TurnosTable