import { useState } from 'react'
import userService from '../../../services/usuarios'
import { UserInformation } from '../../../types'

const formClass = "p-4 max-w-96 mx-auto flex flex-col gap-4 items-stretch border-2"
const labelClass = "text-base text-gray-600"
const inputClass = "border-2 rounded px-2 py-1"
const buttonClass = "bg-blue-400 px-4 py-2 my-4 rounded text-gray-100"

interface LoginFormProps {
  onError: (err: unknown) => unknown;
  onSuccess: (resultado: UserInformation) => unknown;
}

const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const clearFields = () => {
    setEmail('')
    setPassword('')
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const res = await userService.login({ email, password })
      clearFields()
      onSuccess(res)
    } catch(err) {
      clearFields()
      onError(err)
    }
  }

  return(
    <form className={formClass} onSubmit={onSubmit}>
      <div className="flex flex-col">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input type="text"
            name="email"
            id="email"
            className={inputClass}
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='off'
            />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className={labelClass}>Password</label>
          <input type="password"
            name="password"
            id="password"
            className={inputClass}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={buttonClass}>
          Ingresar
        </button>
    </form>
  )
}

export default LoginForm