import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import { ApiActions, AppPageActions } from './app.actions';

export const appFeatureKey: string = 'app';

const initalState: AppState = {
    isDarkMode: false,
    generatingQrCodeBlob: false,
    generatingQrCodeError: '',
    qrCodeBlob: new Blob([], { type: 'text/plain' }),
    qrCodeBlobEnabled: false,
    qrCodeData: '',
    downloadingQrCodeBlob: false
};

export const AppReducer = createReducer(
  initalState,

  // AppPageActions
  on(AppPageActions.appInit, (state: AppState, { isDarkMode }) => ({
    ...state,
    isDarkMode,
    qrCodeData: 'assets/qr-code-example.png' 
  })),
  on(AppPageActions.toggleDarkMode, (state: AppState) => ({
    ...state,
    isDarkMode: !state.isDarkMode
  })),
  on(AppPageActions.setDarkMode, (state: AppState, { isDarkMode }) => ({
    ...state,
    isDarkMode
  })),
  on(AppPageActions.qRCodeRouterNavigated, (state: AppState) => ({
    ...state,
    generatingQrCodeBlob: false,
    generatingQrCodeError: '',
    qrCodeBlob: new Blob([], { type: 'text/plain' }),
    qrCodeBlobEnabled: false,
    qrCodeData: 'assets/qr-code-example.png',
    downloadingQrCodeBlob: false
  })),
  on(AppPageActions.qRCodeBlobToData, (state: AppState, { qrCodeData }) => ({
    ...state,
    qrCodeData
  })),
  on(AppPageActions.downloadQRCodeBlobBegin, (state: AppState) => ({
    ...state,
    downloadingQrCodeBlob: true
  })),
  on(AppPageActions.downloadQRCodeBlobEnd, (state: AppState) => ({
    ...state,
    downloadingQrCodeBlob: false
  })),

  // ApiActions
  on(ApiActions.generateUrlQRCodeBlob, (state: AppState) => ({
    ...state,
    generatingQrCodeBlob: true,
    generatingQrCodeError: ''
  })),
  on(ApiActions.generateEmailQRCodeBlob, (state: AppState) => ({
    ...state,
    generatingQrCodeBlob: true,
    generatingQrCodeError: ''
  })),
  on(ApiActions.generateCZPaymentQRCodeBlob, (state: AppState) => ({
    ...state,
    generatingQrCodeBlob: true,
    generatingQrCodeError: ''
  })),
  on(ApiActions.qRCodeBlobGenerationSuccess, (state: AppState, { qrCodeBlob } ) => ({
    ...state,
    generatingQrCodeBlob: false,
    qrCodeBlob,
    qrCodeBlobEnabled: true
  })),
  on(ApiActions.qRCodeBlobGenerationFail, (state: AppState, { generatingQrCodeError } ) => ({
    ...state,
    generatingQrCodeBlob: false,
    generatingQrCodeError,
    qrCodeBlobEnabled: false
  }))
);