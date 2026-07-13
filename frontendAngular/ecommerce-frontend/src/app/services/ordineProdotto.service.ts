import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdineProdotto } from '../models/ordineProdotto.models';

// ATTENZIONE: nel backend attuale NON esiste nessun endpoint REST per
// OrdineProdotto (righe di un ordine). Aggiungi un OrdineProdottoController
// lato Spring Boot (es. GET /api/ordini/{id}/prodotti) e poi completa qui.
@Injectable({
  providedIn: 'root'
})
export class OrdineProdottoService {
  private apiUrl = 'http://localhost:8080/api/ordine-prodotti'; // endpoint da creare lato backend

  constructor(private http: HttpClient) {}
}