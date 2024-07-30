import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [loginGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./Users/Users.module').then((m) => m.UsersModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
