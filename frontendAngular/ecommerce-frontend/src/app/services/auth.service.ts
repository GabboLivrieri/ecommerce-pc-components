import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Utente } from '../models/utente.models';
import { RegistrazioneRequest } from '../models/registrazione.model';
import { LoginRequest } from '../models/login.model';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

const CHIAVE_STORAGE = 'utenteCorrente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/utenti';

  private utenteCorrenteSubject = new BehaviorSubject<Utente | null>(this.caricaDaStorage());
  utenteCorrente$ = this.utenteCorrenteSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  get utenteCorrente(): Utente | null {
    return this.utenteCorrenteSubject.value;
  }

  registrati(dati: RegistrazioneRequest): Observable<Utente> {
    return this.http.post<Utente>(`${this.apiUrl}/registrazione`, dati);
  }

  login(dati: LoginRequest): Observable<Utente> {
    return this.http.post<Utente>(`${this.apiUrl}/login`, dati).pipe(
      tap((utente) => this.impostaUtenteCorrente(utente))
    );
  }

  logout(): void {
    this.utenteCorrenteSubject.next(null);
    this.rimuoviDaStorage();
  }

  impostaUtenteCorrente(utente: Utente): void {
    this.utenteCorrenteSubject.next(utente);
    this.salvaSuStorage(utente);
  }

  private caricaDaStorage(): Utente | null {

  if (!isPlatformBrowser(this.platformId)) {
    return null;
  }

  try {

    const dati = localStorage.getItem(CHIAVE_STORAGE);

    return dati ? JSON.parse(dati) : null;

  } catch {

    return null;

  }

}

  private salvaSuStorage(utente: Utente): void {
    try {
      localStorage.setItem(CHIAVE_STORAGE, JSON.stringify(utente));
    } catch {
      // Se il salvataggio fallisce l'utente resta comunque loggato in memoria
      // per la sessione corrente.
    }
  }

  private rimuoviDaStorage(): void {
    try {
      localStorage.removeItem(CHIAVE_STORAGE);
    } catch {
      // Nessuna azione necessaria: se lo storage non è disponibile non c'è nulla da rimuovere.
    }
  }
}