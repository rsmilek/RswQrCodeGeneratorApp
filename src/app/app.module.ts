import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material/material.module';
import { QrCodeGeneratorApiModule } from './shared/qr-code-generator-api/qr-code-generator-api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    QrCodeGeneratorApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
