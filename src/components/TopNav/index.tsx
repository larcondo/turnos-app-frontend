import { Link } from 'react-router-dom'

const TopNav = () => {
  const navTitleClass: string = 'text-3xl';
  const linkClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer';
  // const linkActiveClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer border-b-2 border-teal-500';

  return(
    <div className='flex px-6 py-4 justify-between items-center bg-teal-200'>
      <h1 className={navTitleClass}>
        Turnos
      </h1>
      <div className='flex justify-center'>
        <Link to='/' className={linkClass}>Turnos</Link>
        <Link to='/calendar' className={linkClass}>Calendar</Link>
        <Link to='/solicitar' className={linkClass}>Solicitar</Link>
        <Link to='/misturnos' className={linkClass}>Mis turnos</Link>
      </div>
    </div>
  )
}

export default TopNav