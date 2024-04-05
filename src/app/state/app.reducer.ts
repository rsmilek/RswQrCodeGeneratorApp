import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import { ApiActions, AppPageActions } from './app.actions';

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

  on(AppPageActions.toggleDarkMode, (state) => ({
    ...state,
    isDarkMode: !state.isDarkMode
  })),
  on(AppPageActions.setDarkMode, (state, { isDarkMode }) => ({
    ...state,
    isDarkMode
  })),
  on(AppPageActions.qRCodeBlobToData, (state, { qrCodeData }) => ({
    ...state,
    qrCodeData
  })),
  on(AppPageActions.downloadQRCodeBlobBegin, (state) => ({
    ...state,
    downloadingQrCodeBlob: true
  })),
  on(AppPageActions.downloadQRCodeBlobEnd, (state) => ({
    ...state,
    downloadingQrCodeBlob: false
  })),

  on(ApiActions.generateUrlQRCodeBlob, (state) => ({
    ...state,
    generatingQrCodeBlob: true,
    generatingQrCodeError: ''
  })),
  on(ApiActions.generateEmailQRCodeBlob, (state) => ({
    ...state,
    generatingQrCodeBlob: true,
    generatingQrCodeError: ''
  })),
  on(ApiActions.generateCZPaymentQRCodeBlob, (state) => ({
    ...state,
    generatingQrCodeBlob: true,
    generatingQrCodeError: ''
  })),
  on(ApiActions.qRCodeBlobGenerationSuccess, (state, { qrCodeBlob } ) => ({
    ...state,
    generatingQrCodeBlob: false,
    qrCodeBlob,
    qrCodeBlobEnabled: true
  })),
  on(ApiActions.qRCodeBlobGenerationFail, (state, { generatingQrCodeError } ) => ({
    ...state,
    generatingQrCodeBlob: false,
    generatingQrCodeError,
    qrCodeBlobEnabled: false
  }))
);