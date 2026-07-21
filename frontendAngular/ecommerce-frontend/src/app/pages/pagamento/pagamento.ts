import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PagamentoService } from '../../services/pagamento.service';
import { Pagamento } from '../../models/pagamento.models';


@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css'
})
export class PagamentoComponent implements OnInit {


  metodo: string = 'Carta';

  pagamento?: Pagamento;


  constructor(
    private pagamentoService: PagamentoService,
    private router: Router
  ) {}



  ngOnInit(): void {


    const idOrdine = history.state.idOrdine;


    if (!idOrdine) {

      this.router.navigateByUrl('/carrello');

      return;

    }



    this.pagamentoService
      .getPagamentoOrdine(idOrdine)
      .subscribe({

        next: (pagamento) => {

          this.pagamento = pagamento;

        },


        error: errore => {

          console.error(
            'Errore caricamento pagamento:',
            errore
          );

        }

      });


  }




  paga(): void {


    if (!this.pagamento?.id) {

      return;

    }



    this.pagamento.metodo = this.metodo;



    this.pagamentoService
      .confermaPagamento(this.pagamento.id, this.metodo)
      .subscribe({

        next: () => {

          this.router.navigateByUrl('/ordini');

        },


        error: errore => {

          console.error(
            'Errore pagamento:',
            errore
          );

        }

      });

  }

}