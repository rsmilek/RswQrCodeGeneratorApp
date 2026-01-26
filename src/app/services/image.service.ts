import { ElementRef, Injectable } from '@angular/core';
import { Observable, Observer, interval, map, take } from 'rxjs';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private platformService: PlatformService) {}

  /**
   * Transfers given Blob into string Data, designed for image manipulation process
   * @param blob Blob to transfer
   * @returns String Data
   */
  public blobToData(blob: Blob): Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result as string) {
                observer.next(reader.result as string);
                observer.complete();
            } else {
                observer.error(new Error('Failed to convert image from Blob to String'));
            }
        };

        reader.onerror = () => {
            observer.error(new Error('Failed to convert image Blob as String'));
        };

        reader.readAsDataURL(blob);

        // Cleanup function
        return () => {
            reader.abort();
        };
    });
  }

  /**
   * Makes a delay for given time period
   * @param period Delay value in [ms]
   * @returns void Observable
   */
  public delay(period: number): Observable<void> {
    return interval(period).pipe(
      take(1),
      map(() => void 0)
    );
  }

  /**
   * Creates given Blob download link and trigger a click event to open Save dialog to process download
   * @param blob Blob to download
   * @param fileName Default file name to use in Save dialog
   * @param element HTML element to be used for download action
   */
  public async downloadBlobFromLink(blob: Blob, fileName: string, element: ElementRef): Promise<void> {
    if (this.platformService.isNativePlatform()) {
      // Use Capacitor Filesystem for native platforms (Android/iOS)
      await this.saveFileNative(blob, fileName);
    } else {
      // Use traditional web download for web platform
      this.saveFileWeb(blob, fileName, element);
    }
  }

  /**
   * Saves file using traditional web download for web platform
   * @param blob Blob to save
   * @param fileName File name
   * @param element HTML element to be used for download action
   */
  private saveFileWeb(blob: Blob, fileName: string, element: ElementRef): void {
    const qrCodeImageBlobUrl = window.URL.createObjectURL(blob);
    element.nativeElement.href = qrCodeImageBlobUrl;
    element.nativeElement.download = fileName;
    element.nativeElement.click();
  }

  /**
   * Saves file using Capacitor Filesystem API for native platforms
   * @param blob Blob to save
   * @param fileName File name
   */
  private async saveFileNative(blob: Blob, fileName: string): Promise<void> {
    try {
      // Dynamically import Filesystem only on native platforms
      const { Filesystem, Directory } = await import('@capacitor/filesystem');

      // Request permissions for Android
      if (await this.platformService.isAndroidPlatform()) {
        const permission = await Filesystem.requestPermissions();
        if (permission.publicStorage !== 'granted') {
          const errorMsg = 'Storage permission denied!';
          console.error(errorMsg);
          alert('Error saving file: ' + errorMsg);
          throw new Error(errorMsg);
        }
      }

      // Convert Blob to base64
      const base64Data = await this.blobToBase64(blob);
      
      // Save file to Documents directory (app-specific storage)
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents
      });

      console.log('File saved successfully:', fileName);
      alert('File saved to: ' + result.uri);
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file: ' + error);
      throw error;
    }
  }

  /**
   * Converts Blob to base64 string
   * @param blob Blob to convert
   * @returns Base64 string without data URL prefix
   */
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      this.blobToData(blob).subscribe({
        next: (dataUrl) => {
          // Remove data URL prefix (e.g., "data:image/png;base64,")
          const base64 = dataUrl.split(',')[1];
          resolve(base64);
        },
        error: (err) => reject(err)
      });
    });
  }
  
}
