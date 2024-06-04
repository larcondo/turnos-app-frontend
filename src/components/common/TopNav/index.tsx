import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState} from '@states/atoms';
import { UserRoles } from '@/types';

import userService from '@services/usuarios';

import TopNavLink from './TopNavLink';

const TopNav = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const navTitleClass: string = 'text-3xl py-4';
  const linkClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer border-b-2 border-teal-200 text-teal-800';

  const logout = async () => {
    try {
      const res = await userService.logout();
      if (res.status === 200) {
        setUser(null)
        navigate('/login')
      }
    } catch(err){
      console.log(err)
    }
  }

  return(
    <div className='flex justify-between items-end bg-teal-200 px-6'>
      <h1 className={navTitleClass}>
        Turnos
      </h1>
      <div className='flex'>
        { user && <TopNavLink to='/' text='Turnos' /> }
        { user && <TopNavLink to='/solicitar' text='Solicitar' /> }
        { user && user.rol === UserRoles.Client && <TopNavLink to='/misturnos' text='Mis turnos' /> }
        { user && user.rol === UserRoles.Admin && <TopNavLink to='/crear' text='Crear Turnos' /> }
        { user && user.rol === UserRoles.Admin && <TopNavLink to='/solicitados' text='Solicitados' /> }
        { user && <button className={linkClass} onClick={logout}>Log out</button> }
      </div>
    </div>
  )
}

export default TopNav