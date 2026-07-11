import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Serve per usare il ciclo for nell'HTML
import { ProdottoService } from './services/prodottoService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // <-- Ricordati di importarlo qui
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
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