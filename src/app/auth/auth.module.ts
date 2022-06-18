import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordWindowComponent } from './forget-password-window/forget-password-window.component';


@NgModule({
  declarations: [LoginComponent, ForgetPasswordWindowComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
