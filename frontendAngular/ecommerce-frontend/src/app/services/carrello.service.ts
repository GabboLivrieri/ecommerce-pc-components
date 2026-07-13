import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrello } from '../models/carrello.models';

// ATTENZIONE: nel backend attuale NON esiste nessun endpoint REST per
// creare o recuperare un Carrello (esiste solo /api/carrello per i
// CarrelloProdotto, vedi CarrelloProdottoService). Se ti serve, aggiungi
// un CarrelloController con relativi metodi lato Spring Boot e poi
// completa qui i metodi (es. getCarrelloByUtente, creaCarrello...).
@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  private apiUrl = 'http://localhost:8080/api/carrelli'; // endpoint da creare lato backend

  constructor(private http: HttpClient) {}
}