import { Routes } from '@angular/router';
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { HomeComponent } from './pages/home/home';
import { ProdottoDettaglioComponent } from './pages/prodotto-dettaglio/prodotto-dettaglio';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'home', component: HomeComponent},
  { path: 'prodotto/:id', component: ProdottoDettaglioComponent }
];