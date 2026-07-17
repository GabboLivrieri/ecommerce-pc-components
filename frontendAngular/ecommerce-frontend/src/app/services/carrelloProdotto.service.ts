import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarrelloProdotto } from '../models/carrelloProdotto.models';

// Corrisponde a CarrelloController.java (endpoint /api/carrello,
// ma lavora sempre su CarrelloProdotto: nel backend non esiste
// un endpoint dedicato solo al Carrello).
@Injectable({
  providedIn: 'root'
})
export class CarrelloProdottoService {
  private apiUrl = 'http://localhost:8080/api/carrello';

  constructor(private http: HttpClient) {}

  getProdottiCarrello(idCarrello: number): Observable<CarrelloProdotto[]> {
    return this.http.get<CarrelloProdotto[]>(`${this.apiUrl}/utente/${idCarrello}`);
  }

  aggiungiAlCarrello(cp: CarrelloProdotto): Observable<CarrelloProdotto> {
    return this.http.post<CarrelloProdotto>(this.apiUrl, cp);
  }

  rimuoviDalCarrello(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  aggiornaQuantita(id: number, quantita: number) {

  return this.http.put<CarrelloProdotto>(
    `${this.apiUrl}/${id}`,
    {
      quantita: quantita
    }
  );

}
}