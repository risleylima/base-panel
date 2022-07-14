import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module').then((m) => m.AuthModule)
  },
  {
    canActivate: [AuthGuardService],
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
  },
  { path: '**', redirectTo: '/pages/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
