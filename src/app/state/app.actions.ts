import { ElementRef } from '@angular/core';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UrlDTO } from '../shared/contracts/DTOs/UrlDTO';
import { EmailDTO } from '../shared/contracts/DTOs/EmailDTO';
import { CzPaymentDTO } from '../shared/contracts/DTOs/CzPaymentDTO';

export const AppPageActions = createActionGroup({
  source: 'App Page',
  events: {
    'Toggle Dark Mode': emptyProps(),
    'Set Dark Mode': props<{ isDarkMode: boolean }>(),
    'QR Code Blob To Data': props<{ qrCodeData: string }>(),
    'Download QR Code Blob Begin': props<{ 
      blob: Blob, 
      fileName: string, 
      element: ElementRef, 
      period: number 
    }>(),
    'Download QR Code Blob End': emptyProps()
  },
});

export const ApiActions = createActionGroup({
    source: 'API',
    events: {
      'Generate Url QR Code Blob': props<{ urlDTO: UrlDTO }>(),
      'Generate Email QR Code Blob': props<{ emailDTO: EmailDTO }>(),
      'Generate CZ Payment QR Code Blob': props<{ czPaymentDTO: CzPaymentDTO }>(),
      'QR Code Blob Generation Success': props<{ qrCodeBlob: Blob }>(),
      'QR Code Blob Generation Fail': props<{ generatingQrCodeError: string }>()
    },
  });