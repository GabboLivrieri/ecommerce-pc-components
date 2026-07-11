import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdottoService } from '../../services/prodotto.service';
import { ProdottoCardComponent } from '../../components/prodotto-card/prodotto-card';
import { Prodotto } from '../../models/prodotto.model';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, ProdottoCardComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  
  // Un "trigger" reattivo: ogni volta che emette un valore, scatena una nuova GET
  private aggiornaCatalogo$ = new BehaviorSubject<void>(undefined);

  // Questo Observable rimane agganciato all'HTML tramite la pipe async
  prodotti$ = this.aggiornaCatalogo$.pipe(
    switchMap(() => this.prodottoService.getProdotti())
  );

  nuovoProdotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    quantita: 1,
    immagine: '',
    categoria: { id: 1 }
  };

  constructor(private prodottoService: ProdottoService) {}

  ngOnInit(): void {
    // Non serve più chiamare metodi espliciti qui, fa tutto lo switchMap sopra
  }

  inviaProdotto(): void {
    if (this.nuovoProdotto.nome && this.nuovoProdotto.prezzo > 0) {
      this.prodottoService.addProdotto(this.nuovoProdotto).subscribe({
        next: () => {
          // Reset del form
          this.nuovoProdotto = { 
            nome: '', 
            descrizione: '', 
            prezzo: 0, 
            quantita: 1, 
            immagine: '',
            categoria: { id: 1 } 
          };
          
          // 🚀 IL SEGRETO: Diciamo al trigger di emettere un segnale.
          // Lo switchMap intercetta il segnale, rifà la GET e aggiorna l'HTML all'istante!
          this.aggiornaCatalogo$.next();
        }
      });
    }
  }
}