import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {authGuard} from "./auth/guards/auth.guard";
import {PageDuelComponent} from "./features/duel/page-duel/page-duel.component";
import {StartButtonComponent} from "./features/duel/start-button/start-button.component";

export const routes: Routes = [
  {
    path: '',
    component: StartButtonComponent,
  },
  {
    path: 'auth',
    data: { showHeader: false },
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }
    ],
  },
  {
    path: 'duel',
    canActivate: [authGuard],
    component: PageDuelComponent,
  }
];
