import { Ruolo } from './ruolo.models';

export interface Utente {
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  password?: string; // opzionale in risposta: il backend non la restituisce mai (vedi UtenteRispostaDTO)
  ruolo: Ruolo;
}