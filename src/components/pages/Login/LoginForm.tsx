import { useState } from 'react'
import userService from '@services/usuarios'
import { UserInformation } from '@/types'

const formClass = "p-4 max-w-96 mx-auto flex flex-col gap-4 items-stretch"
const labelClass = "text-base text-gray-600"
const inputClass = "border-2 rounded px-2 py-1"
const inputErrorClass = "border-2 rounded px-2 py-1 bg-rose-200 border-rose-400"
const buttonClass = "bg-blue-400 px-4 py-2 my-4 rounded text-gray-100"

interface LoginFormProps {
  onError: (err: unknown) => unknown;
  onSuccess: (resultado: UserInformation) => unknown;
}

const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const clearFields = () => {
    setEmail('')
    setPassword('')
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError(null)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordError(null)
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const { data, error, requestError } = await userService.login({ email, password })
    if (data) {
      clearFields()
      onSuccess(data)
      return
    }

    if (requestError) {
      const { field, message } = requestError
      if (field === 'email') setEmailError(message)
      if (field === 'password') setPasswordError(message)
    } else {  
      onError(error)
    }
  }

  return(
    <form className={formClass} onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="email" className={labelClass}>Email</label>
        <input type="text"
          name="email"
          id="email"
          className={emailError ? inputErrorClass : inputClass}
          value={email}
          onChange={onEmailChange}
          autoComplete='off'
          />
          <p className='text-sm text-rose-400 p-1'>{ emailError }</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className={labelClass}>Password</label>
        <input type="password"
          name="password"
          id="password"
          className={passwordError ? inputErrorClass : inputClass}
          value={password}
          onChange={onPasswordChange}
        />
        <p className='text-sm text-rose-400 p-1'>{ passwordError }</p>
      </div>
      <button type="submit" className={buttonClass}>
        Ingresar
      </button>
    </form>
  )
}

export default LoginForm