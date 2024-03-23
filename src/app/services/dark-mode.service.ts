import { Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly themeKey = 'rswQrCodeActiveTheme';
  private readonly themeClassLight = 'theme-light';
  private readonly themeClassDark = 'theme-dark';

  private renderer: Renderer2;
  private currentThemeClass = this.themeClassLight;

  get isDarkMode(): boolean {
    return this.currentThemeClass === this.themeClassDark;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) { 
    this.renderer = rendererFactory.createRenderer(null, null);

    this.currentThemeClass = localStorage.getItem(this.themeKey) || this.themeClassLight;
    this.renderer.setAttribute(this.document.body, 'class', this.currentThemeClass);
  }

  setDarkModeChange(isDarkMode: boolean) {
    this.currentThemeClass = isDarkMode ? this.themeClassDark : this.themeClassLight;
    this.renderer.setAttribute(this.document.body, 'class', this.currentThemeClass);
    
    localStorage.setItem(this.themeKey, this.currentThemeClass);
  }

}
