import { Carrello } from './carrello.models';
import { Prodotto } from './prodotto.models';

export interface CarrelloProdotto {
  id?: number;
  carrello: Carrello;
  prodotto: Prodotto;
  quantita: number;
}