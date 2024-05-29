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

const getByClient = async () => {
  const url: string = '/turnos?client';
  const { data } = await axiosWithAuth.get<TurnResponse>(url);
  return data;
}

export default {
  getAll,
  getQtyByYearMonth,
  getByDate,
  getByClient,
}