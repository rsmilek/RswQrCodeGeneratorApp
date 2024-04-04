import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UrlDTO } from '../contracts/DTOs/UrlDTO';
import { EmailDTO } from '../contracts/DTOs/EmailDTO';
import { CzPaymentDTO } from '../contracts/DTOs/CzPaymentDTO';

export const AppPageActions = createActionGroup({
  source: 'App Page',
  events: {
    'Toggle Dark Mode': emptyProps(),
    'Set Dark Mode': props<{ isDarkMode: boolean }>(),
    'QR Code Blob To Data': props<{ qrCodeData: string }>()
  },
});

export const ApiActions = createActionGroup({
    source: 'API',
    events: {
      'Generate Url QR Code Blob': props<{ urlDto: UrlDTO }>(),
      'Generate Email QR Code Blob': props<{ emaillDto: EmailDTO }>(),
      'Generate CZ Payment QR Code Blob': props<{ czPaymentDto: CzPaymentDTO }>(),
      'QR Code Blob Generation Success': props<{ qrCodeBlob: Blob }>(),
      'QR Code Blob Generation Fail': props<{ generatingQrCodeError: string }>()
    },
  });