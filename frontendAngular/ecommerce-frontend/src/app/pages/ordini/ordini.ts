import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { OrdineService } from '../../services/ordine.service';
import { Ordine } from '../../models/ordine.models';
import { OrdineProdottoService } from '../../services/ordineProdotto.service';
import { OrdineProdotto } from '../../models/ordineProdotto.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordini',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordini.html',
  styleUrl: './ordini.css'
})
export class Ordini implements OnInit {

  ordini: Ordine[] = [];

  prodottiOrdine: { [idOrdine: number]: OrdineProdotto[] } = {};


  constructor(
    private authService: AuthService,
    private ordineService: OrdineService,
    private ordineProdottoService: OrdineProdottoService,
    private router: Router
  ) {}


  ngOnInit(): void {

    const utente = this.authService.utenteCorrente;


    if (!utente?.id) {

      this.router.navigateByUrl('/login');
      return;

    }


    this.ordineService
      .getOrdiniUtente(utente.id)
      .subscribe(ordini => {

        this.ordini = ordini;


        this.ordini.forEach(ordine => {

          if (!ordine.id) {
            return;
          }


          this.ordineProdottoService
            .getProdottiOrdine(ordine.id)
            .subscribe(prodotti => {

              this.prodottiOrdine[ordine.id!] = prodotti;

            });

        });

      });

  }

  pagaOrdine(id?: number): void {

  if (!id) {
    return;
  }

  this.router.navigateByUrl(`/pagamento/${id}`);

}

}