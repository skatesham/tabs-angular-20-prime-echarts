import { Routes } from '@angular/router';
import { TabsLayoutComponent } from './components/tabs-layout/tabs-layout.component';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    component: TabsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page'),
      },
      {
        path: 'ideas',
        loadComponent: () => import('./pages/ideas/ideas.page'),
      },
      {
        path: 'ritual-daily',
        loadComponent: () => import('./pages/ritual-daily/ritual-daily.page'),
      },
      {
        path: 'ritual-weekly',
        loadComponent: () => import('./pages/ritual-weekly/ritual-weekly.page'),
      },
      {
        path: 'ritual-monthly',
        loadComponent: () => import('./pages/ritual-monthly/ritual-monthly.page'),
      },
      {
        path: 'config',
        loadComponent: () => import('./pages/config/config.page'),
      },
    ],
  },
];
