import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdottoService } from '../../services/prodotto.service';
import { ProdottoCardComponent } from '../../components/prodotto-card/prodotto-card';
import { Prodotto } from '../../models/prodotto.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProdottoCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  prodottiInEvidenza: Prodotto[] = [];
  caricamento = true;
  errore = false;

  constructor(private prodottoService: ProdottoService) {}

  ngOnInit(): void {
    this.prodottoService.getProdotti().subscribe({
      next: (prodotti) => {
        // Non avendo (ancora) una data di inserimento, usiamo l'id più alto
        // come proxy dei "nuovi arrivi" più recenti.
        this.prodottiInEvidenza = [...prodotti]
          .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
          .slice(0, 4);
        this.caricamento = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei prodotti in evidenza:', err);
        this.caricamento = false;
        this.errore = true;
      }
    });
  }
}