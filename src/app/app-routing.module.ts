import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'home', loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'add-product', loadChildren: () => import('../pages/add-product/add-product.module').then( m => m.AddProductModule)},
  { path: 'search-product', loadChildren: () => import('../pages/search-product/search-product.module').then( m => m.SearchProducModule)},
  { path: 'search-results', loadChildren: () => import('../pages/search-results/search-results.module').then( m => m.SearchResultsModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
