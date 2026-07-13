import { Ordine } from './ordine.models';
import { Prodotto } from './prodotto.models';

export interface OrdineProdotto {
  id?: number;
  ordine: Ordine;
  prodotto: Prodotto;
  quantita: number;
  prezzo: number;
}