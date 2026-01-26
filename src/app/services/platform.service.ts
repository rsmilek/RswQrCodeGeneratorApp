import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  /**
   * Detects if running on native platform (Android/iOS)
   * @returns true if running on native platform
   */
  public isNativePlatform(): boolean {
    return !!(window as any).Capacitor;
  }

  /**
   * Detects if running on web browser
   * @returns true if running on web
   */
  public isWebPlatform(): boolean {
    return !this.isNativePlatform();
  }

  /**
   * Gets platform name dynamically
   * @returns Platform identifier: 'android', 'ios', or 'web'
   */
  public async detectPlatform(): Promise<string> {
    if (!this.isNativePlatform()) {
      return 'web';
    }

    const { Capacitor } = await import('@capacitor/core');
    return Capacitor.getPlatform();
  }

  /**
   * Checks if current platform is Android
   * @returns true if Android platform
   */
  public async isAndroidPlatform(): Promise<boolean> {
    const platform = await this.detectPlatform();
    return platform === 'android';
  }

  /**
   * Checks if current platform is iOS
   * @returns true if iOS platform
   */
  public async isIOSPlatform(): Promise<boolean> {
    const platform = await this.detectPlatform();
    return platform === 'ios';
  }
}
