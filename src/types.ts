export interface TurnBasic {
  cancha: string;
  estado: string;
  inicio: string;
  fin: string; 
}

export interface TurnRecord extends TurnBasic {
  id: string;
  solicitadoPor: string | null;
  confirmadoPor: string | null;
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