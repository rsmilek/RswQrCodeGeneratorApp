import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface QrCodeSession {
  isDarkMode: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly sessionKey = 'rswQrCodeSession';
  private readonly themeClassLight = 'theme-light';
  private readonly themeClassDark = 'theme-dark';

  private renderer: Renderer2;
  private session: QrCodeSession = { 
    isDarkMode: false 
  };

  public get isDarkMode(): boolean {
    return this.session.isDarkMode;
  }

  public set isDarkMode(value: boolean){
    this.session.isDarkMode = value;
    this.applyDarkMode();
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) { 
    this.renderer = rendererFactory.createRenderer(null, null);

    const sessionStr = localStorage.getItem(this.sessionKey);
    if (sessionStr) {
      this.session = JSON.parse(sessionStr) as QrCodeSession;
    }
    this.applyDarkMode();
  }

  private applyDarkMode() {
    const currentThemeClass = this.session.isDarkMode ? this.themeClassDark : this.themeClassLight;
    localStorage.setItem(this.sessionKey, JSON.stringify(this.session));
    this.renderer.setAttribute(this.document.body, 'class', currentThemeClass);
  }

}
