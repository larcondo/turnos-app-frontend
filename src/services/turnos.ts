import axios from 'axios';
import { apiBaseUrl } from '../contants';
import { TurnResponse } from '../types';

const getAll = async (token: string) => {
  const url: string = `${apiBaseUrl}/turnos`;
  const { data } = await axios.get<TurnResponse>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export default {
  getAll
}