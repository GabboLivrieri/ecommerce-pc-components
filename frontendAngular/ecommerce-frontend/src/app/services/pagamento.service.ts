import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento.models';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private apiUrl = 'http://localhost:8080/api/pagamenti';


  constructor(private http: HttpClient) {}



  getPagamenti(): Observable<Pagamento[]> {

    return this.http.get<Pagamento[]>(this.apiUrl);

  }



  registraPagamento(pagamento: Pagamento): Observable<Pagamento> {

    return this.http.post<Pagamento>(
      this.apiUrl,
      pagamento
    );

  }



  creaPagamentoDaCarrello(
    idUtente: number,
    metodo: string
  ): Observable<Pagamento> {


    return this.http.post<Pagamento>(
      `${this.apiUrl}/crea/${idUtente}?metodo=${metodo}`,
      {}
    );

  }

  getPagamentoOrdine(idOrdine: number): Observable<Pagamento> {

  return this.http.get<Pagamento>(
    `${this.apiUrl}/ordine/${idOrdine}`
  );

}

}