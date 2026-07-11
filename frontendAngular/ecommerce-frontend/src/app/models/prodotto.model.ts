export interface Prodotto {
  id?: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  quantita: number;   // <-- AGGIUNTO
  immagine?: string;  // <-- AGGIUNTO
  categoria: {
    id: number;
    nome?: string;
  };
}