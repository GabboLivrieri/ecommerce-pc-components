import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prodotto } from '../../models/prodotto.models';

@Component({
  selector: 'app-prodotto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prodotto-card.html',
  styleUrl: './prodotto-card.css'
})
export class ProdottoCardComponent {
  @Input({ required: true }) prodotto!: Prodotto;
}