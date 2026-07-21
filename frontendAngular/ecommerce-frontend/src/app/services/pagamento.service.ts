import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento.models';


@Injectable({
  providedIn: 'root'
})
export class PagamentoService {


  private apiUrl = 'http://localhost:8080/api/pagamenti';



  constructor(
    private http: HttpClient
  ) { }



  getPagamentoOrdine(
    idOrdine: number
  ): Observable<Pagamento> {

    return this.http.get<Pagamento>(
      `${this.apiUrl}/ordine/${idOrdine}`
    );

  }



  confermaPagamento(
    idPagamento: number,
    metodo: string
  ): Observable<Pagamento> {

    return this.http.put<Pagamento>(
      `${this.apiUrl}/${idPagamento}/conferma?metodo=${metodo}`,
      {}
    );

  }


}