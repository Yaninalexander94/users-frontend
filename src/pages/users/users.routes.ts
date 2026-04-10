import { Routes } from '@angular/router';
import { UsersList } from '../../widgets';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersList,
    children: [
      {
        path: 'list',
        component: UsersList,
        pathMatch: 'full',

      },
      {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];
