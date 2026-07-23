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
  standalone: true,
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


  mostraForm = false;


  nuovoProdotto = {

    nome: '',
    descrizione: '',
    prezzo: 0,
    quantita: 0,
    categoriaId: 0

  };


  prodottoModifica: Prodotto | null = null;


  immagine: File | null = null;



  constructor(
    private venditoreService: VenditoreService,
    private prodottoService: ProdottoService,
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) {}



  ngOnInit(): void {


    const utente = this.authService.utenteCorrente;


    if (!utente?.id) {

      return;

    }



    this.venditoreService
      .getVenditori()
      .subscribe({

        next: venditori => {


          const venditore = venditori.find(
            v => v.utente.id === utente.id
          );


          if (!venditore?.id) {

            return;

          }


          this.idVenditore = venditore.id;


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


    this.prodottoService
      .getProdottiVenditore(this.idVenditore)
      .subscribe({

        next: prodotti => {

          this.prodotti = prodotti;

          this.caricamento = false;

        }

      });


  }



  selezionaImmagine(event: Event): void {


    const input = event.target as HTMLInputElement;


    if (input.files && input.files.length > 0) {

      this.immagine = input.files[0];

    }

  }



  aggiungiProdotto(): void {


    const utente = this.authService.utenteCorrente;


    if (!utente?.id) {

      return;

    }



    const formData = new FormData();



    formData.append(
      'idUtente',
      utente.id.toString()
    );


    formData.append(
      'nome',
      this.nuovoProdotto.nome
    );


    formData.append(
      'descrizione',
      this.nuovoProdotto.descrizione
    );


    formData.append(
      'prezzo',
      this.nuovoProdotto.prezzo.toString()
    );


    formData.append(
      'quantita',
      this.nuovoProdotto.quantita.toString()
    );


    formData.append(
      'idCategoria',
      this.nuovoProdotto.categoriaId.toString()
    );



    if (this.immagine) {

      formData.append(
        'immagine',
        this.immagine
      );

    }



    this.prodottoService
      .addProdotto(formData)
      .subscribe({

        next: () => {


          this.nuovoProdotto = {

            nome: '',
            descrizione: '',
            prezzo: 0,
            quantita: 0,
            categoriaId: 0

          };


          this.immagine = null;

          this.mostraForm = false;


          this.caricaProdotti();


        }

      });


  }



  apriModifica(prodotto: Prodotto): void {


    this.prodottoModifica = {

      ...prodotto

    };


    this.immagine = null;


  }



  modificaProdotto(): void {


    const utente = this.authService.utenteCorrente;


    if (
      !utente?.id ||
      !this.prodottoModifica?.id
    ) {

      return;

    }



    if (!this.prodottoModifica.categoria) {

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
      .deleteProdotto(
        id,
        utente.id
      )
      .subscribe({

        next: () => {

          this.caricaProdotti();

        }

      });


  }


}