import axios from 'axios';
import { authBaseUrl } from '@/contants';
import { UserCredentials, UserInformation } from '@/types';

axios.defaults.withCredentials = true;

const login = async (credentials: UserCredentials) => {
  const url: string = `${authBaseUrl}/usuarios/login`

  const { data } = await axios.post<UserInformation>(url, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  return data
};

const logout = async () => {
  const url: string = `${authBaseUrl}/usuarios/logout`

  const { data, status } = await axios.get(url)
  
  return { data, status }
}

export default {
  login,
  logout
}