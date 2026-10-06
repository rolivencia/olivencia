import { Routes } from '@angular/router';

export const routes: Routes = [
  // The profile card lives in the App shell; this keeps `/` matchable now that other routes exist.
  { path: '', pathMatch: 'full', children: [] },
  {
    path: 'wing',
    loadComponent: () => import('./pages/wing-showcase/wing-showcase').then((m) => m.WingShowcase),
  },
];
