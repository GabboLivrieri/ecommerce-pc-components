import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VenditoreService } from '../../services/venditore.service';
import { AuthService } from '../../services/auth.service';
import { ProdottoService } from '../../services/prodotto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Prodotto } from '../../models/prodotto.models';
import { Categoria } from '../../models/categoria.models';


@Component({
  selector: 'app-miei-prodotti',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './miei-prodotti.html',
  styleUrl: './miei-prodotti.css'
})
export class MieiProdotti implements OnInit {


  prodotti: Prodotto[] = [];

  categorie: Categoria[] = [];

  caricamento = true;

  idVenditore!: number;


  prodottoModifica: Prodotto | null = null;

  immagine: File | null = null;



  constructor(
    private venditoreService: VenditoreService,
    private prodottoService: ProdottoService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) { }



  ngOnInit(): void {


    const utente = this.authService.utenteCorrente;


    if (!utente?.id) {

      return;

    }



    this.venditoreService
      .getVenditoreById(utente.id)
      .subscribe({

        next: (venditore) => {

          this.idVenditore = venditore.id!;

          this.caricaProdotti();

        }

      });



    this.categoriaService
      .getCategorie()
      .subscribe({

        next: categorie => {

          this.categorie = categorie;

        }

      });


  }



  caricaProdotti(): void {


    this.venditoreService
      .getProdottiVenditore(this.idVenditore)
      .subscribe({

        next: prodotti => {

          this.prodotti = prodotti;

          this.caricamento = false;

        }

      });


  }



  apriModifica(prodotto: Prodotto): void {


    this.prodottoModifica = {
      ...prodotto
    };


    this.immagine = null;


  }



  selezionaImmagine(event: Event): void {


    const input = event.target as HTMLInputElement;


    if (input.files && input.files.length > 0) {

      this.immagine = input.files[0];

    }

  }



  modificaProdotto(): void {


    const utente = this.authService.utenteCorrente;


    if (
      !utente?.id ||
      !this.prodottoModifica
    ) {

      return;

    }



    const formData = new FormData();


    formData.append(
      'idUtente',
      utente.id.toString()
    );


    formData.append(
      'nome',
      this.prodottoModifica.nome
    );


    formData.append(
      'descrizione',
      this.prodottoModifica.descrizione
    );


    formData.append(
      'prezzo',
      this.prodottoModifica.prezzo.toString()
    );


    formData.append(
      'quantita',
      this.prodottoModifica.quantita.toString()
    );


    if (!this.prodottoModifica.categoria) {
      return;
    }

    formData.append(
      'quantita',
      this.prodottoModifica.quantita.toString()
    );


    if (!this.prodottoModifica.categoria) {
      return;
    }


    formData.append(
      'idCategoria',
      this.prodottoModifica.categoria.id.toString()
    );



    if (this.immagine) {

      formData.append(
        'immagine',
        this.immagine
      );

    }



    this.prodottoService
      .modificaProdotto(
        this.prodottoModifica.id,
        formData
      )
      .subscribe({

        next: () => {

          this.prodottoModifica = null;

          this.caricaProdotti();

        }

      });


  }



  eliminaProdotto(id: number): void {


    const utente = this.authService.utenteCorrente;


    if (!utente?.id) {

      return;

    }



    this.prodottoService
      .deleteProdotto(id, utente.id)
      .subscribe({

        next: () => {

          this.caricaProdotti();

        }

      });


  }



}