
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './pages/home/page.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FAQComponent } from './pages/faq/faq.component';

const routes: Routes = [

  { path: '', component: PageComponent },
  { path: 'faq', component: FAQComponent},
  { path: 'politicas-de-privacidade', component: PrivacyPolicyComponent },
  { path: 'termos-de-uso', component: TermsComponent }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
