import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ButtomComponent } from './components/buttom/buttom.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { BannerAlertComponent } from './components/banner-alert/banner-alert.component';
import { AlertComponent } from './components/alert';
import { AccountModule } from '../pages/account/account.module';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtomComponent,
    FooterComponent,
    ModalComponent,
    BannerAlertComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountModule
  ],

  exports: [
    HeaderComponent,
    ButtomComponent,
    FooterComponent,
    ModalComponent,
    BannerAlertComponent,
    AlertComponent,
  ]
})
export class SharedModule { }
