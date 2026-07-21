import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { VenditoreService } from '../../services/venditore.service';
import { Utente } from '../../models/utente.models';
import { UtenteService } from '../../services/utente.service';
import { Cliente } from '../../models/cliente.models';
import { Venditore } from '../../models/venditore.models';
import { ProdottoService } from '../../services/prodotto.service';
import { Prodotto } from '../../models/prodotto.models';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-profilo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profilo.html',
  styleUrl: './profilo.css'
})
export class Profilo implements OnInit {


  utente: Utente | null = null;

  cliente?: Cliente;

  venditore?: Venditore;

  prodottiVenduti: Prodotto[] = [];

  modifica = false;


  formProfilo: FormGroup;

  formCliente: FormGroup;

  formVenditore: FormGroup;



  constructor(

    private authService: AuthService,

    private clienteService: ClienteService,

    private venditoreService: VenditoreService,

    private prodottoService: ProdottoService,

    private utenteService: UtenteService,

    private fb: FormBuilder,

    private router: Router

  ) {


    this.formProfilo = this.fb.group({

      nome: ['', Validators.required],

      cognome: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['']

    });



    this.formCliente = this.fb.group({

      telefono: [''],

      indirizzo: [''],

      citta: [''],

      cap: ['']

    });



    this.formVenditore = this.fb.group({

      nomeAzienda: [''],

      partitaIva: [''],

      telefono: ['']

    });


  }




  ngOnInit(): void {


    this.utente = this.authService.utenteCorrente;



    if (!this.utente) {

      this.router.navigateByUrl('/login');

      return;

    }




    if (this.utente.ruolo === 'CLIENTE' && this.utente.id) {


      this.clienteService
        .getClienti()
        .subscribe(clienti => {


          this.cliente =
            clienti.find(
              c => c.utente.id === this.utente?.id
            );



          if (this.cliente) {


            this.formCliente.patchValue({

              telefono: this.cliente.telefono,

              indirizzo: this.cliente.indirizzo,

              citta: this.cliente.citta,

              cap: this.cliente.cap

            });


          }


        });


    }




    if (this.utente.ruolo === 'VENDITORE' && this.utente.id) {


      this.venditoreService
        .getVenditori()
        .subscribe(venditori => {


          this.venditore =
            venditori.find(
              v => v.utente.id === this.utente?.id
            );



          if (this.venditore) {


            this.formVenditore.patchValue({

              nomeAzienda: this.venditore.nomeAzienda,

              partitaIva: this.venditore.partitaIva,

              telefono: this.venditore.telefono

            });



            this.prodottoService
              .getProdottiVenditore(this.venditore.id!)
              .subscribe(prodotti => {


                this.prodottiVenduti = prodotti;


              });


          }


        });


    }


  }





  logout(): void {


    this.authService.logout();

    this.router.navigateByUrl('/login');


  }





  abilitaModifica(): void {


    if (!this.utente) return;


    this.modifica = true;



    this.formProfilo.patchValue({

      nome: this.utente.nome,

      cognome: this.utente.cognome,

      email: this.utente.email

    });


  }





  salvaCliente(): void {


    if (!this.cliente?.id) return;



    this.clienteService
      .modificaCliente(
        this.cliente.id,
        this.formCliente.value
      )
      .subscribe({

        next: cliente => {

          this.cliente = cliente;

        }

      });


  }





  salvaVenditore(): void {


    if (!this.venditore?.id) return;



    this.venditoreService
      .modificaVenditore(
        this.venditore.id,
        this.formVenditore.value
      )
      .subscribe({

        next: venditore => {

          this.venditore = venditore;

        }

      });


  }





  salvaModifica(): void {


    if (!this.utente?.id) return;



    if (this.formProfilo.invalid) return;



    this.utenteService
      .modificaUtente(
        this.utente.id,
        this.formProfilo.value
      )
      .subscribe({

        next: utente => {


          this.utente = utente;


          this.authService
            .impostaUtenteCorrente(utente);


          this.modifica = false;


        }

      });


  }


}