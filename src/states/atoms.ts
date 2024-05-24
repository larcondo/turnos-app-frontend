import { atom } from 'recoil'
import { UserInformation  } from '../types';

export const userState = atom<UserInformation|null>({
  key: 'userState',
  default: null
});