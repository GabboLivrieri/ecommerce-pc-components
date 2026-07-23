import { Categoria } from './categoria.models';
import { Venditore } from './venditore.models';

export interface Prodotto {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  quantita: number;
  immagine?: string;
  categoria: Categoria;
  venditore?: Venditore;
}
