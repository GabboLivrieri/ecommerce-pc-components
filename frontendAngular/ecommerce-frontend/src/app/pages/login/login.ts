import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  dati = {
    email: '',
    password: ''
  };

  invioInCorso = false;
  errore: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  accedi(): void {
    this.errore = null;
    this.invioInCorso = true;

    this.authService.login(this.dati).subscribe({
      next: () => {
        this.invioInCorso = false;
        this.router.navigateByUrl('/catalogo');
      },
      error: (err) => {
        this.errore = err?.error?.message ?? 'Accesso non riuscito. Riprova.';
        this.invioInCorso = false;
      }
    });
  }
}