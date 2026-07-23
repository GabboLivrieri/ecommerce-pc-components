import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venditore } from '../models/venditore.models';

@Injectable({
  providedIn: 'root'
})
export class VenditoreService {
  private apiUrl = 'http://localhost:8080/api/venditori';

  constructor(private http: HttpClient) {}

  getVenditori(): Observable<Venditore[]> {
    return this.http.get<Venditore[]>(this.apiUrl);
  }

  getVenditoreById(id: number): Observable<Venditore> {
    return this.http.get<Venditore>(`${this.apiUrl}/${id}`);
  }

  addVenditore(venditore: Venditore): Observable<Venditore> {
    return this.http.post<Venditore>(this.apiUrl, venditore);
  }
  
  modificaVenditore(id: number, dati: any): Observable<Venditore> {
  return this.http.put<Venditore>(`${this.apiUrl}/${id}`, dati);
}
}