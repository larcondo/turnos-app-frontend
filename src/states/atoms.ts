import { atom } from 'recoil'
import { UserInformation, TurnResponse } from '@/types';

export const userState = atom<UserInformation|null>({
  key: 'userState',
  default: null
});

export const dayInfo = atom<TurnResponse | null>({
  key: 'dayInfo',
  default: null
})