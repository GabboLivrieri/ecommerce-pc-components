import { Routes } from '@angular/router';
import { Catalogo } from './pages/catalogo/catalogo';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Registrazione } from './pages/registrazione/registrazione';
import { Profilo } from './pages/profilo/profilo';
import { authGuard } from './guards/auth.guard';
import { Carrello } from './pages/carrello/carrello';
import { Ordini } from './pages/ordini/ordini';
import { PagamentoComponent } from './pages/pagamento/pagamento';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'catalogo', component: Catalogo },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'registrazione', component: Registrazione },
  { path: 'profilo', component: Profilo, canActivate: [authGuard] },
  { path: 'carrello', component: Carrello, canActivate: [authGuard] },
  { path: 'ordini', component: Ordini, canActivate: [authGuard] },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [authGuard] }

];