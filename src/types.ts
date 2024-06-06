export interface TurnBasic {
  cancha: string;
  estado: string;
  fecha: string;
  inicio: string;
  fin: string; 
}

export interface TurnRecord extends TurnBasic {
  id: string;
  solicitadoPor: string | null;
  confirmadoPor: string | null;
}

export interface TurnRequested extends TurnRecord {
  nombre: string;
  email: string;
}

export enum TurnStates {
  Disponible = 'disponible',
  Solicitado = 'solicitado',
  Confirmado = 'confirmado',
  Cancelado = 'cancelado'
}

export enum CanchasDisponibles {
  Cancha1 = 'cancha 1',
  Cancha2 = 'cancha 2',
  Cancha3 = 'cancha 3',
  Cancha4 = 'cancha 4'
}

export interface TurnResponse {
  cantidad: number;
  page: number;
  pages: number;
  offset: number;
  turnos: TurnRecord[];
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserInformation {
  email: string;
  nombre: string;
  accessToken: string;
  rol: string;
}

export type UserBasicInformation = Omit<UserInformation, 'accessToken'>;

export enum UserRoles {
  Admin = 'admin',
  Client = 'client',
}

export interface NewToken {
  accessToken: string;
}

export interface CantidadPorFecha {
  cantidad: number;
  fecha: string
}

export interface ErrorState {
  message?: string;
  title?: string;
}