import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordine } from '../models/ordine.models';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {
  private apiUrl = 'http://localhost:8080/api/ordini';

  constructor(private http: HttpClient) {}

  creaOrdine(ordine: Ordine): Observable<Ordine> {
    return this.http.post<Ordine>(this.apiUrl, ordine);
  }

  getOrdiniUtente(idUtente: number): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(`${this.apiUrl}/utente/${idUtente}`);
  }
}