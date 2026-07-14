import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ProdottoService } from '../../services/prodotto.service';
import { Prodotto } from '../../models/prodotto.models';

@Component({
  selector: 'app-prodotto-dettaglio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prodotto-dettaglio.html',
  styleUrl: './prodotto-dettaglio.css'
})
export class ProdottoDettaglioComponent implements OnInit, OnDestroy {

  prodotto: Prodotto | null = null;
  caricamento = true;
  errore = false;
  quantitaSelezionata = 1;

  private routeSub?: Subscription;

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
    private route: ActivatedRoute,
    private prodottoService: ProdottoService
  ) {}

  ngOnInit(): void {
    // Ascolto i cambi di parametro (non solo lo snapshot iniziale): così, se in futuro
    // si naviga da una pagina di dettaglio a un'altra (es. "prodotti correlati"),
    // il componente si aggiorna senza essere ricreato da Angular.
    this.routeSub = this.route.paramMap.pipe(
      switchMap((params) => {
        this.caricamento = true;
        this.errore = false;
        this.prodotto = null;
        this.quantitaSelezionata = 1;

        const id = Number(params.get('id'));
        return this.prodottoService.getProdottoById(id);
      })
    ).subscribe({
      next: (prodotto) => {
        this.prodotto = prodotto;
        this.caricamento = false;
      },
      error: (err) => {
        console.error('Errore nel caricamento del prodotto:', err);
        this.caricamento = false;
        this.errore = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  get iconaCategoria(): string {
    const nomeCategoria = this.prodotto?.categoria?.nome;
    return (nomeCategoria && this.iconePerCategoria[nomeCategoria]) || '🔧';
  }

  get disponibile(): boolean {
    return (this.prodotto?.quantita ?? 0) > 0;
  }

  incrementaQuantita(): void {
    const max = this.prodotto?.quantita ?? 1;
    if (this.quantitaSelezionata < max) {
      this.quantitaSelezionata++;
    }
  }

  decrementaQuantita(): void {
    if (this.quantitaSelezionata > 1) {
      this.quantitaSelezionata--;
    }
  }
}