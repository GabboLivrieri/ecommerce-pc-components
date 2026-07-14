import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ProdottoService } from '../../services/prodotto.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProdottoCardComponent } from '../../components/prodotto-card/prodotto-card';
import { Prodotto } from '../../models/prodotto.models';
import { Categoria } from '../../models/categoria.models';

interface Filtri {
  ricerca: string;
  categoriaId: number | null;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, ProdottoCardComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {

  categorie: Categoria[] = [];
  caricamento = true;
  errore = false;
  mostraForm = false;
  invioInCorso = false;

  private prodottiSubject = new BehaviorSubject<Prodotto[]>([]);
  private filtriSubject = new BehaviorSubject<Filtri>({ ricerca: '', categoriaId: null });

  // Legato al form dei filtri tramite ngModel
  filtri: Filtri = { ricerca: '', categoriaId: null };

  // Stream reattivo: si aggiorna sia quando arrivano nuovi prodotti sia quando cambiano i filtri
  prodotti$ = combineLatest([this.prodottiSubject, this.filtriSubject]).pipe(
    map(([prodotti, filtri]) => this.filtraProdotti(prodotti, filtri))
  );

  nuovoProdotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
    quantita: 1,
    immagine: ''
  };
  categoriaFormId: number | null = null;

  constructor(
    private prodottoService: ProdottoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.caricaProdotti();

    this.categoriaService.getCategorie().subscribe({
      next: (categorie) => this.categorie = categorie,
      error: (err) => console.error('Errore nel caricamento delle categorie:', err)
    });
  }

  private caricaProdotti(): void {
    this.caricamento = true;
    this.prodottoService.getProdotti().subscribe({
      next: (prodotti) => {
        this.prodottiSubject.next(prodotti);
        this.caricamento = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei prodotti:', err);
        this.caricamento = false;
        this.errore = true;
      }
    });
  }

  aggiornaFiltri(): void {
    this.filtriSubject.next({ ...this.filtri });
  }

  private filtraProdotti(prodotti: Prodotto[], filtri: Filtri): Prodotto[] {
    const ricerca = filtri.ricerca.trim().toLowerCase();

    return prodotti.filter((prodotto) => {
      const corrispondeRicerca = !ricerca ||
        prodotto.nome.toLowerCase().includes(ricerca) ||
        (prodotto.descrizione ?? '').toLowerCase().includes(ricerca);

      const corrispondeCategoria = !filtri.categoriaId || prodotto.categoria?.id === filtri.categoriaId;

      return corrispondeRicerca && corrispondeCategoria;
    });
  }

  toggleForm(): void {
    this.mostraForm = !this.mostraForm;
  }

  inviaProdotto(): void {
    const categoria = this.categorie.find(c => c.id === this.categoriaFormId);

    if (!this.nuovoProdotto.nome || this.nuovoProdotto.prezzo <= 0 || !categoria) {
      return;
    }

    const prodotto: Prodotto = { ...this.nuovoProdotto, categoria };

    this.invioInCorso = true;
    this.prodottoService.addProdotto(prodotto).subscribe({
      next: () => {
        this.resetForm();
        this.caricaProdotti();
        this.invioInCorso = false;
        this.mostraForm = false;
      },
      error: (err) => {
        console.error('Errore nell\'aggiunta del prodotto:', err);
        this.invioInCorso = false;
      }
    });
  }

  private resetForm(): void {
    this.nuovoProdotto = { nome: '', descrizione: '', prezzo: 0, quantita: 1, immagine: '' };
    this.categoriaFormId = null;
  }
}