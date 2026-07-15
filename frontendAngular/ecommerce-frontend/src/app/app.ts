import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Serve per usare il ciclo for nell'HTML
import { ProdottoService } from './services/prodotto.service';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar], // <-- Ricordati di importarlo qui
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  listaProdotti: any[] = [];

  // Iniettiamo il nostro servizio nel costruttore
  constructor(private prodottoService: ProdottoService) {}

  ngOnInit(): void {
    // Quando la pagina si carica, chiediamo i prodotti a Spring Boot
    this.prodottoService.getProdotti().subscribe({
      next: (data) => {
        this.listaProdotti = data;
        console.log('Prodotti ricevuti:', this.listaProdotti);
      },
      error: (err) => {
        console.error('Errore nel collegamento col backend:', err);
      }
    });
  }
}