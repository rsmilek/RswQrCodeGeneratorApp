import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AppPageActions = createActionGroup({
  source: 'App Page',
  events: {
    'Toggle Dark Mode': emptyProps(),
    'Set Dark Mode': props<{isDarkMode: boolean}>()
  },
});