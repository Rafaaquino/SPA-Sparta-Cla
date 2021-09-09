import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterConfirmationComponent } from './register-confirmation/register-confirmation.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RegisterConfirmationComponent
  ]
})
export class AccountModule { }