import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPage } from './login/login.page';
import { AdminPage } from './admin/admin.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'admin',
    component: AdminPage
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./user/user.page').then( m => m.UserPage)
  },
  {
    path: 'inquiry',
    loadChildren: () => import('./inquiry/inquiry.module').then( m => m.InquiryPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }