import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prodotto } from '../models/prodotto.models';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {

  private apiUrl = 'http://localhost:8080/api/prodotti';


  constructor(private http: HttpClient) { }



  getProdotti(): Observable<Prodotto[]> {

    return this.http.get<Prodotto[]>(
      this.apiUrl
    );

  }



  getProdottoById(id: number): Observable<Prodotto> {

    return this.http.get<Prodotto>(
      `${this.apiUrl}/${id}`
    );

  }



  addProdotto(
    prodotto: FormData
  ): Observable<Prodotto> {

    return this.http.post<Prodotto>(
      this.apiUrl,
      prodotto
    );

  }



  updateProdotto(
    id: number,
    prodotto: FormData
  ): Observable<Prodotto> {

    return this.http.put<Prodotto>(
      `${this.apiUrl}/${id}`,
      prodotto
    );

  }



  deleteProdotto(
    id: number,
    idUtente: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}?idUtente=${idUtente}`
    );

  }

  getProdottiVenditore(idVenditore: number): Observable<Prodotto[]> {

    return this.http.get<Prodotto[]>(
      `${this.apiUrl}/venditore/${idVenditore}`
    );

  }

}