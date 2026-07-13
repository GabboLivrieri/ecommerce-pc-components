import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValutazioneProdotto } from '../models/valutazioneProdotto.models';

@Injectable({
  providedIn: 'root'
})
export class ValutazioneProdottoService {
  private apiUrl = 'http://localhost:8080/api/valutazioni/prodotto';

  constructor(private http: HttpClient) {}

  getValutazioniProdotto(idProdotto: number): Observable<ValutazioneProdotto[]> {
    return this.http.get<ValutazioneProdotto[]>(`${this.apiUrl}/${idProdotto}`);
  }

  recensisciProdotto(vp: ValutazioneProdotto): Observable<ValutazioneProdotto> {
    return this.http.post<ValutazioneProdotto>(this.apiUrl, vp);
  }
}