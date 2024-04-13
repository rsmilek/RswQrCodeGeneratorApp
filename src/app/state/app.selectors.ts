import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const appStoreSelector = createFeatureSelector<AppState>('appStore');

export const darkModeSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.isDarkMode
);

export const generatingQrCodeBlobSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.generatingQrCodeBlob
);

export const generatingQrCodeErrorSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.generatingQrCodeError
);

export const qrCodeBlobSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.qrCodeBlob
);

export const qrCodeBlobEnabledSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.qrCodeBlobEnabled
);

export const qrCodeDataSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.qrCodeData
);

export const downloadingQrCodeBlobSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.downloadingQrCodeBlob
);
