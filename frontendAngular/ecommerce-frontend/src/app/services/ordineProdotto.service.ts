import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdineProdotto } from '../models/ordineProdotto.models';


@Injectable({
  providedIn: 'root'
})
export class OrdineProdottoService {

  private apiUrl = 'http://localhost:8080/api/ordine-prodotti';


  constructor(private http: HttpClient) {}


  getProdottiOrdine(idOrdine: number): Observable<OrdineProdotto[]> {

    return this.http.get<OrdineProdotto[]>(
      `${this.apiUrl}/${idOrdine}`
    );

  }

}