import { Ruolo } from './ruolo.models';

export interface RegistrazioneRequest {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  ruolo: Ruolo;
}