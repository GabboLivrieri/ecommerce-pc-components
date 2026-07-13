import { Utente } from './utente.models';

export interface Cliente {
  id?: number;
  utente: Utente;
  indirizzo?: string;
  citta?: string;
  cap?: string;
  telefono?: string;
}