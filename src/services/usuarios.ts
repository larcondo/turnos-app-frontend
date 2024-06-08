import axios, { AxiosError } from 'axios';
import { authBaseUrl } from '@/contants';
import { UserCredentials, UserInformation } from '@/types';
import { LoginResponse } from './types';

axios.defaults.withCredentials = true;

const login = async (credentials: UserCredentials): Promise<LoginResponse> => {
  const url: string = `${authBaseUrl}/usuarios/login`
  const headers = { 'Content-Type': 'application/json' }

  try {
    const { data } = await axios.post<UserInformation>(url, credentials, { headers })
    return { data }
  } catch(err) {
    if (err instanceof AxiosError && err.response) {
      const { field, message } = err.response.data
      return {error: err, requestError: { field, message } }
    }

    return { error: err }
  }
};

const logout = async () => {
  const url: string = `${authBaseUrl}/usuarios/logout`

  const { data, status } = await axios.get(url)
  
  return { data, status }
}

const autoLogin = async () => {
  const url: string = `${authBaseUrl}/usuarios/refresh`
  const { data } = await axios.get<UserInformation>(url)
  return data;
}

export default {
  login,
  logout,
  autoLogin,
}