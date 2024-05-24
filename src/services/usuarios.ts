import axios from 'axios';
import { authBaseUrl } from '../contants';
import { UserCredentials, UserInformation } from '../types';

const login = async (credentials: UserCredentials) => {
  const url: string = `${authBaseUrl}/usuarios/login`

  const { data } = await axios.post<UserInformation>(url, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  return data
};

export default {
  login
}