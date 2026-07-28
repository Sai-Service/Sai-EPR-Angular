import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PageNotFouundComponent } from './page-not-fouund/page-not-fouund.component';
// import { CanDeactivateGuard } from './can-deactivate-guard.service';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule) },
  {path :'login',loadChildren:()=> import('./auth/auth.module').then(m=> m.AuthModule)},
  { path : '' ,redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ 
    // CanDeactivateGuard
  ]
})
export class AppRoutingModule { }
