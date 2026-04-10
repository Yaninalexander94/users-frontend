import { Routes } from '@angular/router';
import { usersRoutes } from '../pages';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    children: usersRoutes,
  },
  {
    path: '**',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
