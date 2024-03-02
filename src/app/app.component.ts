import { Component, Inject, Renderer2, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  private readonly themeKey = 'rswQrCodeActiveTheme';
  private readonly themeClassLight = 'theme-light';
  private readonly themeClassDark = 'theme-dark';
  private currentThemeClass = 'theme-light';
  readonly title = 'QR Code Generator';

  get isDarkMode(): boolean {
    return this.currentThemeClass === 'theme-dark';
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.currentThemeClass = localStorage.getItem(this.themeKey) || this.themeClassLight;
    this.renderer.setAttribute(this.document.body, 'class', this.currentThemeClass);
  }

  onDarkModeChange(isDarkMode: boolean) {
    this.currentThemeClass = isDarkMode ? this.themeClassDark : this.themeClassLight;
    this.renderer.setAttribute(this.document.body, 'class', this.currentThemeClass);
    localStorage.setItem(this.themeKey, this.currentThemeClass);
  }

}
