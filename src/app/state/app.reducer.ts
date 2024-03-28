import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import { AppPageActions } from './app.actions';

const initalState: AppState = {
  isDarkMode: false
};

export const AppReducer = createReducer(
  initalState,
  on(AppPageActions.toggleDarkMode, (state) => ({
    ...state,
    isDarkMode: !state.isDarkMode,
  })),
  on(AppPageActions.setDarkMode, (state, {isDarkMode: darkMode}) => ({
    ...state,
    isDarkMode: darkMode
  }))
);