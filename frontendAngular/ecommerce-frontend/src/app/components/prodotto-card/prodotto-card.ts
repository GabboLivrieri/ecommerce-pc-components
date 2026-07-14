import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Prodotto } from '../../models/prodotto.models';

@Component({
  selector: 'app-prodotto-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prodotto-card.html',
  styleUrl: './prodotto-card.css'
})
export class ProdottoCardComponent {
  @Input({ required: true }) prodotto!: Prodotto;

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

  get iconaCategoria(): string {
    const nomeCategoria = this.prodotto?.categoria?.nome;
    return (nomeCategoria && this.iconePerCategoria[nomeCategoria]) || '🔧';
  }

  get disponibile(): boolean {
    return (this.prodotto?.quantita ?? 0) > 0;
  }
}