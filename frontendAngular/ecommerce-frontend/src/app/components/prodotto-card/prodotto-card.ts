import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prodotto } from '../../models/prodotto.models';
import { AuthService } from '../../services/auth.service';
import { CarrelloService } from '../../services/carrello.service';
import { CarrelloProdottoService } from '../../services/carrelloProdotto.service';
import { CarrelloProdotto } from '../../models/carrelloProdotto.models';

@Component({
  selector: 'app-prodotto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prodotto-card.html',
  styleUrl: './prodotto-card.css'
})
export class ProdottoCardComponent {

  @Input({ required: true }) prodotto!: Prodotto;


  private readonly iconePerCategoria: { [nomeCategoria: string]: string } = {
    'Processori': '🧠',
    'Schede Video': '🎮',
    'Schede Madri': '🔌',
    'RAM': '💾',
    'SSD': '💽',
    'Hard Disk': '🗄️',
    'Alimentatori': '⚡',
    'Case': '🖥️',
    'Dissipatori': '❄️',
    'Ventole': '🌀'
  };


  constructor(
    private authService: AuthService,
    private carrelloService: CarrelloService,
    private carrelloProdottoService: CarrelloProdottoService
  ) {}


  get iconaCategoria(): string {
    const nomeCategoria = this.prodotto?.categoria?.nome;
    return (nomeCategoria && this.iconePerCategoria[nomeCategoria]) || '🔧';
  }


  get disponibile(): boolean {
    return (this.prodotto?.quantita ?? 0) > 0;
  }


 aggiungiAlCarrello(): void {

  const utente = this.authService.utenteCorrente;


  if (!utente?.id || !this.prodotto.id) {
    return;
  }


  this.carrelloService
    .getCarrelloUtente(utente.id)
    .subscribe(carrello => {


      if (!carrello) {

        this.carrelloService
          .creaCarrello(utente.id!)
          .subscribe(nuovoCarrello => {

            this.salvaProdottoCarrello(nuovoCarrello.id!);

          });

        return;
      }


      this.salvaProdottoCarrello(carrello.id!);

    });

}


private salvaProdottoCarrello(idCarrello: number): void {

  const carrelloProdotto: CarrelloProdotto = {

    carrello: {
      id: idCarrello,
      utente: this.authService.utenteCorrente!
    },

    prodotto: this.prodotto,

    quantita: 1

  };


  this.carrelloProdottoService
    .aggiungiAlCarrello(carrelloProdotto)
    .subscribe({

      next: () => {
        console.log('Prodotto aggiunto al carrello');
      },

      error: errore => {
        console.error(errore);
      }

    });

}

}