import { atom } from 'recoil'
import { UserInformation, TurnResponse, CantidadPorFecha, TurnRecord, ErrorState } from '@/types';
import { CountGroup } from '@/services/turnos';

export const userState = atom<UserInformation|null>({
  key: 'userState',
  default: null
});

export const userTurns = atom<TurnRecord[]>({
  key: 'userTurns',
  default: []
});

export const dayInfo = atom<TurnResponse>({
  key: 'dayInfo',
  default: {
    cantidad: 0,
    offset: 0,
    page: 0,
    pages: 0,
    turnos: []
  }
});

export const dailyQtyForMonth = atom<CantidadPorFecha[]>({
  key: 'dailyQtyForMonth',
  default: []
});

export const dayTurnsQty = atom<CountGroup[]>({
  key: 'dayTurnsQty',
  default: []
});

export const errorState = atom<ErrorState>({
  key: 'errorState',
  default: {
    message: undefined,
    title: undefined,
  },
});