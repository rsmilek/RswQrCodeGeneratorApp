import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrCodeMainComponent } from './qr-code-main/qr-code-main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component' 

// Routes definition with the respect of priorities
const appRoutes: Routes = [
  { path: 'url', component: QrCodeMainComponent, data: { tag: 'url' }},
  { path: 'email', component: QrCodeMainComponent, data: { tag: 'email' }},
  { path: '',   redirectTo: '/url', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes, {enableTracing: false}  // <-- debugging purposes only
      )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
