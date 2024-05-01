import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DarkModeService } from './services/dark-mode.service';
import { AppPageActions } from './state/app.actions';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{  
  
  public readonly title = 'QR Code Generator';

  constructor(
    private store: Store<AppState>,
    private darkModeService: DarkModeService
  ) { }

  public ngOnInit() {
    // ngRx store initialization -> state can be changed by actions only!
    this.store.dispatch(AppPageActions.appInit({ isDarkMode: this.darkModeService.isDarkMode }));
  }

}
