import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  // L'URL del tuo controller Spring Boot
  private apiUrl = 'http://localhost:8080/api/prodotti'; 

  constructor(private http: HttpClient) { }

  // Metodo elementare per ottenere la lista di tutti i prodotti PC
  getProdotti(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}