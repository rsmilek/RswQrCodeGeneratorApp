import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  blobToData(blob: Blob): Observable<string> {
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

}
