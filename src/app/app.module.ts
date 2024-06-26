import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material/material.module';

import { AppReducer, appFeatureKey } from './state/app.reducer';
import { AppEffects } from "./state/app.effects";

import { AppComponent } from './app.component';
import { ProgressButtonComponent } from './progress-button/progress-button.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QrCodeMainComponent } from './qr-code-main/qr-code-main.component';
import { QrCodeFormUrlComponent } from './qr-code-forms/qr-code-form-url/qr-code-form-url.component';
import { QrCodeFormEmailComponent } from './qr-code-forms/qr-code-form-email/qr-code-form-email.component';
import { QrCodeFormCzPaymentComponent } from './qr-code-forms/qr-code-form-cz-payment/qr-code-form-cz-payment.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DarkModeComponent,
    ProgressButtonComponent,
    PageNotFoundComponent,
    QrCodeMainComponent,
    QrCodeFormUrlComponent,
    QrCodeFormEmailComponent,
    QrCodeFormCzPaymentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({ [appFeatureKey]: AppReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AppRoutingModule
  ],
  providers: [
    // provideClientHydration(), // Required for SSR
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
  export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
