import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes'
  },
  {
    path: 'recipes',
    children: [
      {
        path: '',
        loadComponent: () => import('./recipes/home/home.component').then((c) => c.HomeComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./recipes/recipes-creation/recipes-creation.component').then((c) => c.RecipesCreationComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./recipes/recipes-edition/recipes-edition.component').then((c) => c.RecipesEditionComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./recipes/recipes-details/recipes-details.component').then((c) => c.RecipesDetailsComponent)
      }
    ]
  }
];
