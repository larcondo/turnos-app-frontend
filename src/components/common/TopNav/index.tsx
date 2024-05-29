import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { userState } from '../../../states/atoms';
import userService from '../../../services/usuarios';
import { useNavigate } from 'react-router-dom';

const TopNav = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const navTitleClass: string = 'text-3xl';
  const linkClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer';
  // const linkActiveClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer border-b-2 border-teal-500';

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
    <div className='flex px-6 py-4 justify-between items-center bg-teal-200'>
      <h1 className={navTitleClass}>
        Turnos
      </h1>
      <div className='flex justify-center'>
        { user && <Link to='/' className={linkClass}>Turnos</Link> }
        { user && <Link to='/solicitar' className={linkClass}>Solicitar</Link> }
        { user && <Link to='/misturnos' className={linkClass}>Mis turnos</Link> }
        { user && <Link to='/solicitar' className={linkClass}>Crear Turnos</Link> }
        { user && <button className={linkClass} onClick={logout}>Log out</button> }
      </div>
    </div>
  )
}

export default TopNav