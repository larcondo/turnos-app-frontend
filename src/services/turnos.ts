import axiosWithAuth from './axios';
import { CantidadPorFecha, TurnResponse, TurnStates, TurnRequested } from '@/types';

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

const getRequested = async (fecha: string) => {
  const url: string = `/turnos/solicitados?fecha=${fecha}`;
  const { data } = await axiosWithAuth.get<TurnRequested[]>(url);
  return data;
}

interface RequestTurnRes {
  id: string;
  solicitadoPor: string;
  estado: string;
}

const requestTurn = async (id: string) => {
  const url: string = `/turnos/solicitar/${id}`;
  const { data } = await axiosWithAuth.post<RequestTurnRes>(url);
  return data;
}

interface ConfirmTurnRes {
  id: string;
  confirmadoPor: string;
  estado: string;
}

const confirmTurn = async (id: string) => {
  const url: string = `/turnos/confirmar/${id}`;
  const { data } = await axiosWithAuth.post<ConfirmTurnRes>(url);
  return data;
} 

export default {
  getAll,
  getQtyByYearMonth,
  getByDate,
  countByDate,
  getDaysTurns,
  getByClient,
  getRequested,
  requestTurn,
  confirmTurn,
}