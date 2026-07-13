import { Injectable } from '@angular/core';
import { Ruolo } from '../models/ruolo.models';

// Nessun endpoint backend: 'Ruolo' e' un enum Java, non un'entita' su DB.
// I valori qui devono restare sincronizzati con Ruolo.java (CLIENTE, VENDITORE).
@Injectable({
  providedIn: 'root'
})
export class RuoloService {

  getRuoli(): Ruolo[] {
    return ['CLIENTE', 'VENDITORE'];
  }
}