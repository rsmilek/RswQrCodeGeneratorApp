import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { QrCodeMainComponent } from './components/qr-code-main/qr-code-main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component' 
import { QrCodeFormUrlComponent } from './components/qr-code-forms/qr-code-form-url/qr-code-form-url.component';
import { QrCodeFormEmailComponent } from './components/qr-code-forms/qr-code-form-email/qr-code-form-email.component';
import { QrCodeFormCzPaymentComponent } from './components/qr-code-forms/qr-code-form-cz-payment/qr-code-form-cz-payment.component';

const appRoutes: Routes = [
  { path: '', 
    redirectTo: '/url', 
    pathMatch: 'full' 
  },
  // QR code form components - begin
  { 
    path: 'url', 
    component: QrCodeMainComponent, 
    data: { 
      tag: 'Url', 
      qrCodeFormComponent: QrCodeFormUrlComponent 
    }
  },
  { 
    path: 'email', 
    component: QrCodeMainComponent,
    data: { 
      tag: 'Email', 
      qrCodeFormComponent: QrCodeFormEmailComponent 
    }
  },
  { 
    path: 'czpaymentorder', 
    component: QrCodeMainComponent, 
    data: { 
      tag: 'CZ Payment Order', 
      qrCodeFormComponent: QrCodeFormCzPaymentComponent 
    }
  },
  // QR code form components - end
  { 
    path: '**', 
    component: PageNotFoundComponent 
  },
];

/** 
 * QR code App routes only -> a {@link(appRoutes)} subset
 * Determines router data (path, tag) to be further used in {@link(NavigationComponent)}
 * */
export const appRoutesQrCode: Route[] = appRoutes.filter(route => route.data !== undefined);

/**
 * Determines if given route URL is {@link(appRoutesQrCode)} URL
 * @param routeUrl route URL to check 
 * @returns True on success otherwise False
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
