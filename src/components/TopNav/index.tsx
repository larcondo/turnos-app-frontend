const navTitleClass: string = 'text-3xl';
const linkClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer';
const linkActiveClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer border-b-2 border-teal-500';

interface TopNavProps {
  actualPage: string,
  onClick: React.Dispatch<React.SetStateAction<string>>;
}

const TopNav = (props: TopNavProps): JSX.Element => {
  return(
    <div className='flex px-6 py-4 justify-between items-center bg-teal-200'>
      <h1 className={navTitleClass}>
        Turnos
      </h1>
      <div className='flex justify-center'>
        <button className={props.actualPage === 'turnos' ? linkActiveClass : linkClass} onClick={() => props.onClick('turnos')}>Turnos</button>
        <button className={props.actualPage === 'solicitar' ? linkActiveClass : linkClass} onClick={() => props.onClick('solicitar')}>Solicitar</button>
        <button className={props.actualPage === 'misturnos' ? linkActiveClass : linkClass} onClick={() => props.onClick('misturnos')}>Mis Turnos</button>
      </div>
    </div>
  )
}

export default TopNav