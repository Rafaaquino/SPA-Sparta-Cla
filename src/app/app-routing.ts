import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './pages/home/page.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FAQComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';
import { RulesComponent } from './pages/rules/rules.component';
import { TournamentComponent } from './pages/tournament/tournament.component';
import { AuthGuard } from './_services/auth.guard';
import { LoggedPagesComponent } from './pages/admin/logged-pages/logged-pages.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TableResultComponent } from './pages/table-result/table-result.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { ConfirmEmailComponent } from './pages/account/confirm-email/confirm-email.component';

const adminModule = () => import('./pages/admin/admin-layout.module').then(x => x.AdminLayoutModule);

const routes: Routes = [

  { path: '', component: PageComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'torneios', component: TournamentComponent },
  { path: 'regras', component: RulesComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'politicas-de-privacidade', component: PrivacyPolicyComponent },
  { path: 'termos-de-uso', component: TermsComponent },
  { path: 'resultado-partida', component: TableResultComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm', component: ConfirmEmailComponent },
  {
    path: '',
    component: LoggedPagesComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: adminModule
    }]
  },
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: []
})
export class AppRoutingModule { }
