import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'admin',loadChildren: ()=> import('./admin/admin.module').then(m=> m.AdminModule)},
  {path :'login',loadChildren:()=> import('./login/login.module').then(m=> m.LoginModule)},
  { path : '' ,redirectTo: 'login', pathMatch: 'full' }
];
