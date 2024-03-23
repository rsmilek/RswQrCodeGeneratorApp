import { Component } from '@angular/core';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  readonly title = 'QR Code Generator';

  get isDarkMode(): boolean {
    return this.darkModeService.isDarkMode;    
  }

  constructor(
    private darkModeService: DarkModeService
  ) { }

  onDarkModeChange(isDarkMode: boolean) {
    this.darkModeService.setDarkModeChange(isDarkMode);
  }

}
