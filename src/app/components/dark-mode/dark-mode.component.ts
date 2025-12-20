import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../state/app.state';
import { darkModeSelector } from '../../state/app.selectors';
import { AppPageActions } from '../../state/app.actions';

@Component({
    selector: 'app-dark-mode',
    templateUrl: './dark-mode.component.html',
    styleUrl: './dark-mode.component.scss',
    standalone: false
})
export class DarkModeComponent {

  public isDarkMode = this.store.selectSignal(darkModeSelector);

  constructor(private store: Store<AppState>) { }

  public onClick() {
    this.store.dispatch(AppPageActions.toggleDarkMode());
  }

}
