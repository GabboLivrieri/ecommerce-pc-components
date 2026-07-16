import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrello } from '../models/carrello.models';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  private apiUrl = 'http://localhost:8080/api/carrelli';


  constructor(private http: HttpClient) {}


  getCarrelloUtente(idUtente: number): Observable<Carrello> {

    return this.http.get<Carrello>(
      `${this.apiUrl}/utente/${idUtente}`
    );

  }


  creaCarrello(idUtente: number): Observable<Carrello> {

    return this.http.post<Carrello>(
      `${this.apiUrl}/utente/${idUtente}`,
      {}
    );

  }

}