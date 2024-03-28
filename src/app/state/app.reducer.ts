import { createReducer, on } from '@ngrx/store';
import { AppState } from './app.state';
import { AppPageActions } from './app.actions';

const initalState: AppState = {
  darkMode: false
};

export const AppReducer = createReducer(
  initalState,
  on(AppPageActions.toggleDarkMode, (state) => ({
    ...state,
    darkMode: !state.darkMode,
  })),
  on(AppPageActions.setDarkMode, (state, {darkMode}) => ({
    ...state,
    darkMode
  }))
);