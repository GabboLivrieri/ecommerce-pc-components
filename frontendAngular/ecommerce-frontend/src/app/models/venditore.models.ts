import { Utente } from './utente.models';

export interface Venditore {
  id?: number;
  utente: Utente;
  nomeAzienda?: string;
  partitaIva?: string;
  telefono?: string;
}