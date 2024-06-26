import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '@states/atoms'
import { setToken } from '@utils/token'
import { UserBasicInformation, UserInformation } from '@/types'

import LoginForm from './LoginForm'

const Login = () => {
  const [, setUser] = useRecoilState<UserBasicInformation | null>(userState)
  const navigate = useNavigate()

  const onSuccess = (resultado: UserInformation) => {
    if (resultado.accessToken) {
      const { accessToken, ...basicInfo } = resultado
      setUser(basicInfo)
      setToken(accessToken)
      navigate('/')
    }
  }

  const onError = (err: unknown) => {
    console.log('Login error:', err)
  }

  return(
    <div>
      <h1 className='text-xl text-center py-6'>Login</h1>

      <LoginForm onSuccess={onSuccess} onError={onError} />

    </div>
  )
}

export default Login