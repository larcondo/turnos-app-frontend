import { CanchasDisponibles } from "../../../types"

const buttonClass: string = 'bg-teal-300 py-8 px-6 rounded-lg flex-1 mx-4 hover:bg-teal-400';

const Solicitar = () => {
  const courts: string[] = Object.values(CanchasDisponibles);

  return(
    <div className='p-10'>
      <h1 className='text-2xl'>Solicitar Turnos</h1>

      <div className='flex justify-around py-10'>
        { courts.map(c => <button className={buttonClass} key={c}>{ c }</button>) }
      </div>
    </div>
  )
}

export default Solicitar