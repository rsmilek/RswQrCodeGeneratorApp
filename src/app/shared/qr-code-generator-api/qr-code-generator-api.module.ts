import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { QrCodeGeneratorApiService } from './qr-code-generator-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  providers: [
    QrCodeGeneratorApiService
  ]
})
export class QrCodeGeneratorApiModule { }
