import { Prodotto } from './prodotto.models';
import { Utente } from './utente.models';

export interface ValutazioneProdotto {
  id?: number;
  prodotto: Prodotto;
  utente: Utente;
  voto: number;
  commento?: string;
}