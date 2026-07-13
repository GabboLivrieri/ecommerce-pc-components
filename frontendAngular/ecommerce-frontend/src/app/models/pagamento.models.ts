import { Ordine } from './ordine.models';

export interface Pagamento {
  id?: number;
  ordine: Ordine;
  metodo: string;
  stato: string;
  dataPagamento?: string;
}