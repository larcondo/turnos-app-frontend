import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState} from '@states/atoms';
import { UserRoles } from '@/types';
import { LuUserCircle } from 'react-icons/lu';

import userService from '@services/usuarios';

import TopNavLink from './TopNavLink';

const TopNav = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const navTitleClass: string = 'text-3xl py-4';
  const linkClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer text-teal-800 flex items-center gap-2 self-stretch';

  const logout = async () => {
    try {
      const res = await userService.logout();
      if (res.status === 200) {
        setUser(null)
      }
      navigate('/login')
    } catch(err){
      console.log(err)
    }
  }

  return(
    <div className='flex justify-between items-center bg-teal-200 px-6'>
      <h1 className={navTitleClass}>
        Turnos
      </h1>
      { user &&
        <div className='flex items-end self-stretch'>
          <TopNavLink to='/' text='Turnos' />
          <TopNavLink to='/solicitar' text='Solicitar' />
          { user.rol === UserRoles.Client && <TopNavLink to='/misturnos' text='Mis turnos' /> }
          { user.rol === UserRoles.Admin && <TopNavLink to='/crear' text='Crear Turnos' /> }
          { user.rol === UserRoles.Admin && <TopNavLink to='/solicitados' text='Solicitados' /> }
        </div>
      }
      { user &&
        <button className={linkClass} onClick={logout}>
          <LuUserCircle size={24} /> Log out
        </button>
      }
    </div>
  )
}

export default TopNav