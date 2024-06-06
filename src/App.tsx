import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { errorState, userState } from '@states/atoms';
import { ErrorState } from '@/types';
import { useEffect, useState } from 'react';
import { setToken } from '@utils/token';
import { autoLoginCookie } from './utils/cookies';

import userService from '@services/usuarios'

import TopNav from '@components/common/TopNav';
import AlertError from '@components/common/AlertError';
import Loading from './components/common/Loading';

function App() {
  const [error, setError] = useRecoilState(errorState)
  const [user, setUser] = useRecoilState(userState)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!autoLoginCookie()) throw new Error('No autologin')
        const data = await userService.autoLogin()
        const { accessToken, ...basicInfo } = data
        if (accessToken) {
          setUser(basicInfo)
          setToken(accessToken)
        }
      } catch(err) {
        // console.log(err)
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }
    
    if (user) return setIsLoading(false)

    void fetchUser()

  }, [user, setUser, navigate])

  const onClose = (state: ErrorState) => setError(state)

  if (isLoading) return <div className='flex justify-center pt-36'>
    <Loading />
  </div>

  return (
    <main className='main-container'>
      <TopNav />
      <AlertError
        error={error}
        onClose={onClose}
      />
      <Outlet />
    </main>
  )
}

export default App