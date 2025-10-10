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
        path: 'config',
        loadComponent: () => import('./pages/config/config.page'),
      },
    ],
  },
];
