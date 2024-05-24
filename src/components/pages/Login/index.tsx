import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../../../services/usuarios'
import { useRecoilState } from 'recoil'
import { userState } from '../../../states/atoms'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setUser] = useRecoilState(userState)
  const navigate = useNavigate()

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await userService.login({ email, password })
      if (res.accessToken) {
        setUser(res)
        navigate('/turnos')
      }
    } catch(err) {
      console.log('Login error:', err)
    }
    setEmail('')
    setPassword('')
  }

  return(
    <div>
      <h1 className='text-xl text-center'>Login</h1>
      <form onSubmit={onSubmit} className="p-4 max-w-96 mx-auto flex flex-col gap-4 items-stretch border-2">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-base text-gray-600">Email</label>
          <input type="text" name="email" id="email"
            className="border-2 rounded px-2 py-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='off'
            />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-base text-gray-600">Password</label>
          <input type="password" name="password" id="password"
            className="border-2 rounded px-2 py-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-400 px-4 py-2 my-4 rounded text-gray-100">
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default Login