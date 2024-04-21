import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { QrCodeMainComponent } from './qr-code-main/qr-code-main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component' 

const appRoutes: Routes = [
  { path: '', redirectTo: '/url', pathMatch: 'full' },
  { path: 'url', component: QrCodeMainComponent, data: { tag: 'Url' }},
  { path: 'email', component: QrCodeMainComponent, data: { tag: 'Email' }},
  { path: 'czpaymentorder', component: QrCodeMainComponent, data: { tag: 'CZ Payment Order' }},
  { path: '**', component: PageNotFoundComponent },
];

/** QR code App routes only - {@link(appRoutes)} subset */
const appRoutesQrCode: Route[] = appRoutes.filter(route => route.data !== undefined);

/**
 * Determines if given route URL is {@link(appRoutesQrCode)} URL
 * @param routeUrl route URL to check 
 * @returns True on success othewise False
 */
export function isRouteQrCodeUrl(routeUrl: string): boolean {
  for (const route of appRoutesQrCode) {
    if (route.path && routeUrl.includes(route.path)) {
      return true;
    }
  }
  return false;
}

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }  // <-- debugging purposes only
      )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
