import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material/material.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { AppReducer } from './state/app.reducer';
import { AppEffects } from "./state/app.effects";

import { AppComponent } from './app.component';
import { ProgressButtonComponent } from './progress-button/progress-button.component';
import { NavigationComponent } from './navigation/navigation.component';
import { QrCodeMainComponent } from './qr-code-main/qr-code-main.component';
import { QrCodeUrlComponent } from './qr-code-forms/qr-code-url/qr-code-url.component';
import { QrCodeEmailComponent } from './qr-code-forms/qr-code-email/qr-code-email.component';
import { QrCodeFormCzPaymentComponent } from './qr-code-forms/qr-code-form-cz-payment/qr-code-form-cz-payment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProgressButtonComponent,
    QrCodeMainComponent,
    QrCodeUrlComponent,
    QrCodeEmailComponent,
    QrCodeFormCzPaymentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({ appStore: AppReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects]),
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
