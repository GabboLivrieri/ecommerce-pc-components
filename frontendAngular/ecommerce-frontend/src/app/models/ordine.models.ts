import { Utente } from './utente.models';

export interface Ordine {

  id?: number;

  utente: Utente;

  dataOrdine: string;

  totale: number;

  stato: string;

}