import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AboutComponent, PathNotFoundComponent, LoginComponent } from './layout';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart-list').then(m => m.CartModule),
    data: {
      preload: true
    }
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders').then(m => m.OrdersModule),
    data: {
      preload: true
    }
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PathNotFoundComponent,
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
