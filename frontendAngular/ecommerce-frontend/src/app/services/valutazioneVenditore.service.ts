import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValutazioneVenditore } from '../models/valutazioneVenditore.models';

@Injectable({
  providedIn: 'root'
})
export class ValutazioneVenditoreService {
  private apiUrl = 'http://localhost:8080/api/valutazioni/venditore';

  constructor(private http: HttpClient) {}

  getValutazioniVenditore(idVenditore: number): Observable<ValutazioneVenditore[]> {
    return this.http.get<ValutazioneVenditore[]>(`${this.apiUrl}/${idVenditore}`);
  }

  recensisciVenditore(vv: ValutazioneVenditore): Observable<ValutazioneVenditore> {
    return this.http.post<ValutazioneVenditore>(this.apiUrl, vv);
  }
}