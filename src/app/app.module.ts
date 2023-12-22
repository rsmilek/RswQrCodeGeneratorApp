import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './shared/material/material.module';
import { QrCodeGeneratorApiModule } from './shared/qr-code-generator-api/qr-code-generator-api.module';

import { AppComponent } from './app.component';
import { QrCodeUrlComponent } from './qr-code/qr-code-url/qr-code-url.component';

@NgModule({
  declarations: [
    AppComponent,
    QrCodeUrlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    QrCodeGeneratorApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }