import { Venditore } from './venditore.models';
import { Utente } from './utente.models';

export interface ValutazioneVenditore {
  id?: number;
  venditore: Venditore;
  utente: Utente;
  voto: number;
  commento?: string;
}