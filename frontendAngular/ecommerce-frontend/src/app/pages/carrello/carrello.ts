import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CarrelloService } from '../../services/carrello.service';
import { CarrelloProdottoService } from '../../services/carrelloProdotto.service';
import { CarrelloProdotto } from '../../models/carrelloProdotto.models';
import { Router } from '@angular/router';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrello.html',
  styleUrl: './carrello.css',
})
export class Carrello implements OnInit {
  prodotti: CarrelloProdotto[] = [];

  idCarrello?: number;

  constructor(
    private authService: AuthService,
    private carrelloService: CarrelloService,
    private carrelloProdottoService: CarrelloProdottoService,
    private pagamentoService: PagamentoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const utente = this.authService.utenteCorrente;

    if (!utente?.id) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.carrelloService.getCarrelloUtente(utente.id).subscribe((carrello) => {
      if (!carrello?.id) {
        return;
      }

      this.idCarrello = carrello.id;

      this.carrelloProdottoService.getProdottiCarrello(carrello.id).subscribe((prodotti) => {
        this.prodotti = prodotti;
      });
    });
  }

  totale(): number {
    return this.prodotti.reduce(
      (totale, elemento) => totale + elemento.prodotto.prezzo * elemento.quantita,
      0,
    );
  }

  rimuovi(id?: number): void {
    if (!id) {
      return;
    }

    this.carrelloProdottoService.rimuoviDalCarrello(id).subscribe(() => {
      this.prodotti = this.prodotti.filter((p) => p.id !== id);
    });
  }

  aumenta(item: CarrelloProdotto): void {
    if (!item.id) {
      return;
    }

    this.carrelloProdottoService
      .aggiornaQuantita(item.id, item.quantita + 1)
      .subscribe((risposta) => {
        item.quantita = risposta.quantita;
      });
  }

  diminuisci(item: CarrelloProdotto): void {
    if (!item.id) {
      return;
    }

    if (item.quantita === 1) {
      this.rimuovi(item.id);

      return;
    }

    this.carrelloProdottoService
      .aggiornaQuantita(item.id, item.quantita - 1)
      .subscribe((risposta) => {
        item.quantita = risposta.quantita;
      });
  }



  vaiAlPagamento(): void {

    const utente = this.authService.utenteCorrente;


    if (!utente?.id) {

      return;

    }



    this.pagamentoService
      .checkout(utente.id)
      .subscribe({

        next: (ordine) => {


          this.router.navigate(
            ['/pagamento'],
            {
              state: {
                idOrdine: ordine.id
              }
            }
          );


        },


        error: errore => {

          console.error(
            'Errore checkout:',
            errore
          );

        }

      });


  }
}
