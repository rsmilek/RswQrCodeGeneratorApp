import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const appStoreSelector = createFeatureSelector<AppState>('appStore');

export const darkModeSelector = createSelector(
    appStoreSelector, 
    (appState) => appState.isDarkMode
);
