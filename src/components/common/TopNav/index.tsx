import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState} from '@states/atoms';
import { UserRoles } from '@/types';
import { LuUserCircle } from 'react-icons/lu';

import userService from '@services/usuarios';

import TopNavLink from './TopNavLink';
import FloatingMenu from './FloatingMenu';

const TopNav = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const navTitleClass: string = 'text-3xl py-4';
  
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
        <>
          <div className='flex items-end self-stretch'>
            <TopNavLink to='/' text='Turnos' />
            <TopNavLink to='/solicitar' text='Solicitar' />
            { user.rol === UserRoles.Client && <TopNavLink to='/misturnos' text='Mis turnos' /> }
            { user.rol === UserRoles.Admin && <TopNavLink to='/crear' text='Crear Turnos' /> }
            { user.rol === UserRoles.Admin && <TopNavLink to='/solicitados' text='Solicitados' /> }
          </div>
          <FloatingMenu
            buttonContent={<><LuUserCircle size={24} /> { user.nombre }</>}
          >
            <p className='p-1 text-nowrap text-sm'>Rol: { user.rol }</p>
            <p className='p-1 text-nowrap text-sm'>Email: { user.email }</p>
            <button onClick={logout} className='bg-teal-400 p-1 mt-4'>Log out</button>
          </FloatingMenu>
        </>
      }
    </div>
  )
}

export default TopNav