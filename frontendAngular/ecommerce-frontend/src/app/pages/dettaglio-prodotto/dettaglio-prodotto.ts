import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProdottoService } from '../../services/prodotto.service';
import { AuthService } from '../../services/auth.service';
import { CarrelloService } from '../../services/carrello.service';
import { CarrelloProdottoService } from '../../services/carrelloProdotto.service';

import { Prodotto } from '../../models/prodotto.models';
import { CarrelloProdotto } from '../../models/carrelloProdotto.models';


@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dettaglio-prodotto.html',
  styleUrl: './dettaglio-prodotto.css'
})
export class DettaglioProdotto implements OnInit {


  prodotto?: Prodotto;

  caricamento = true;



  constructor(
    private route: ActivatedRoute,
    private prodottoService: ProdottoService,
    private authService: AuthService,
    private carrelloService: CarrelloService,
    private carrelloProdottoService: CarrelloProdottoService
  ) {}



  ngOnInit(): void {


    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );


    this.prodottoService
      .getProdottoById(id)
      .subscribe({

        next: prodotto => {

          this.prodotto = prodotto;

          this.caricamento = false;

        }

      });


  }



  get disponibile(): boolean {

    return (this.prodotto?.quantita ?? 0) > 0;

  }



  aggiungiAlCarrello(): void {


    const utente = this.authService.utenteCorrente;


    if (
      !utente?.id ||
      !this.prodotto?.id
    ) {

      return;

    }



    this.carrelloService
      .getCarrelloUtente(utente.id)
      .subscribe(carrello => {



        if (!carrello) {


          this.carrelloService
            .creaCarrello(utente.id!)
            .subscribe(nuovoCarrello => {

              this.salvaProdottoCarrello(
                nuovoCarrello.id!
              );

            });


          return;

        }



        this.salvaProdottoCarrello(
          carrello.id!
        );


      });


  }



  private salvaProdottoCarrello(
    idCarrello: number
  ): void {


    const cp: CarrelloProdotto = {


      carrello: {
        id: idCarrello
      },


      prodotto: this.prodotto!,


      quantita: 1

    };



    this.carrelloProdottoService
      .aggiungiAlCarrello(cp)
      .subscribe({

        next: () => {

          console.log(
            'Prodotto aggiunto al carrello'
          );

        }

      });


  }


}