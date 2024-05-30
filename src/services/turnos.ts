import axiosWithAuth from './axios';
import { CantidadPorFecha, TurnResponse, TurnStates } from '../types';

const getAll = async () => {
  const url: string = '/turnos';
  const { data } = await axiosWithAuth.get<TurnResponse>(url);
  return data;
};

const getQtyByYearMonth = async (prefix: string) => {
  const url: string = `/turnos/count/yearmonth?prefix=${prefix}`
  const { data } = await axiosWithAuth.get<CantidadPorFecha[]>(url);
  return data;
}

const getByDate = async (date: string) => {
  const url: string = `/turnos?fecha=${date}&&estado=${TurnStates.Disponible}`;
  const { data } = await axiosWithAuth.get<TurnResponse>(url);
  return data;
}

export type CountGroup = {
  cantidad: number;
  cancha?: string;
  fecha?: string;
};

const countByDate = async (date: string) => {
  const url: string = `/turnos/count-and-group?group=cancha&&fecha=${date}&&estado=${TurnStates.Disponible}`;
  const { data } = await axiosWithAuth.get<CountGroup[]>(url);
  return data;
}

const getDaysTurns = async (date: string, cancha: string) => {
  const url: string = `/turnos?fecha=${date}&cancha=${cancha}`;
  const { data } = await axiosWithAuth.get<TurnResponse>(url);
  return data;
}

const getByClient = async () => {
  const url: string = '/turnos?client';
  const { data } = await axiosWithAuth.get<TurnResponse>(url);
  return data;
}

export default {
  getAll,
  getQtyByYearMonth,
  getByDate,
  countByDate,
  getDaysTurns,
  getByClient,
}