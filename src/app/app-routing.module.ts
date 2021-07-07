import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PageNotFouundComponent } from './page-not-fouund/page-not-fouund.component';
// import { CanDeactivateGuard } from './can-deactivate-guard.service';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // {path: '', redirectTo: '', pathMatch: 'full'},
  // {path: '**', component:PageNotFouundComponent},
  // { path: 'admin', loadChildren: () => import('../app/body-main/body-main.module').then(m => m.BodyMainModule) },
  { path: 'admin', loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule) },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // {path: '', redirectTo: '', pathMatch: 'full'},
  // {path: '**', component:PageNotFouundComponent},
  // {path:'AdminSideBare',component:AdminSideBareComponent}
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
