import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venditore } from '../models/venditore.models';
import { Prodotto } from '../models/prodotto.models';

@Injectable({
  providedIn: 'root'
})
export class VenditoreService {


  private apiUrl = 'http://localhost:8080/api/venditori';


  constructor(
    private http: HttpClient
  ) {}



  getVenditoreById(id: number): Observable<Venditore> {

    return this.http.get<Venditore>(
      `${this.apiUrl}/${id}`
    );

  }



  getProdottiVenditore(id: number): Observable<Prodotto[]> {

    return this.http.get<Prodotto[]>(
      `${this.apiUrl}/${id}/prodotti`
    );

  }


}