import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PagamentoService } from '../../services/pagamento.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css'
})
export class PagamentoComponent {


  metodo: string = 'Carta';


  constructor(
    private pagamentoService: PagamentoService,
    private authService: AuthService,
    private router: Router
  ) {}



  paga(): void {


    const utente = this.authService.utenteCorrente;


    if (!utente?.id) {
      return;
    }



    this.pagamentoService
      .creaPagamentoDaCarrello(
        utente.id,
        this.metodo
      )
      .subscribe({

        next: () => {

          this.router.navigateByUrl('/ordini');

        },


        error: errore => {

          console.error(errore);

        }

      });


  }


}