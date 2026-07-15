import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { VenditoreService } from '../../services/venditore.service';
import { RuoloService } from '../../services/ruolo.service';
import { Ruolo } from '../../models/ruolo.models';
import { Utente } from '../../models/utente.models';

@Component({
  selector: 'app-registrazione',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registrazione.html',
  styleUrl: './registrazione.css'
})
export class Registrazione{

  ruoli: Ruolo[] = [];

  dati = {
    nome: '',
    cognome: '',
    email: '',
    password: '',
    telefono: '',
    indirizzo: '',
    ruolo: 'CLIENTE' as Ruolo
  };

  invioInCorso = false;
  errore: string | null = null;

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private venditoreService: VenditoreService,
    private ruoloService: RuoloService,
    private router: Router
  ) {}

  // Initialize ruoli after ruoloService is available
  ngOnInit(): void {
    this.ruoli = this.ruoloService.getRuoli();
  }

  get isCliente(): boolean {
    return this.dati.ruolo === 'CLIENTE';
  }

  registrati(): void {
    this.errore = null;
    this.invioInCorso = true;

    // 1) Creo l'utente "base" (nome, cognome, email, password, ruolo).
    this.authService.registrati({
      nome: this.dati.nome,
      cognome: this.dati.cognome,
      email: this.dati.email,
      password: this.dati.password,
      ruolo: this.dati.ruolo
    }).subscribe({
      next: (utente) => this.completaProfilo(utente),
      error: (err) => {
        this.errore = err?.error?.message ?? 'Registrazione non riuscita. Riprova.';
        this.invioInCorso = false;
      }
    });
  }

  // 2) In base al ruolo, creo il record collegato (Cliente o Venditore)
  //    con i dati aggiuntivi (telefono, indirizzo...).
  private completaProfilo(utente: Utente): void {
    if (this.dati.ruolo === 'CLIENTE') {
      this.clienteService.addCliente({
        utente,
        telefono: this.dati.telefono,
        indirizzo: this.dati.indirizzo
      }).subscribe({
        next: () => this.completaRegistrazione(utente),
        error: () => this.completaRegistrazione(utente) // l'utente è comunque creato, il profilo si può completare dopo
      });
    } else {
      this.venditoreService.addVenditore({
        utente,
        telefono: this.dati.telefono
      }).subscribe({
        next: () => this.completaRegistrazione(utente),
        error: () => this.completaRegistrazione(utente)
      });
    }
  }

  private completaRegistrazione(utente: Utente): void {
    this.authService.impostaUtenteCorrente(utente);
    this.invioInCorso = false;
    this.router.navigateByUrl('/catalogo');
  }
}