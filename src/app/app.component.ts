import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DarkModeService } from './services/dark-mode.service';
import { AppPageActions } from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{  
  readonly title = 'QR Code Generator';

  constructor(
    private store: Store,
    private darkModeService: DarkModeService
  ) { }

  ngOnInit() {
    // ngRx store initialization -> state can be changed by actions only!
    this.store.dispatch(AppPageActions.setDarkMode({ isDarkMode: this.darkModeService.isDarkMode }));
    this.store.dispatch(AppPageActions.qRCodeBlobToData({ qrCodeData: 'assets/qr-code-example.png' }));
  }

}
