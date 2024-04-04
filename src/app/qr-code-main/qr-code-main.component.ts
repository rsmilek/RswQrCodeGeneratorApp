import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { darkModeSelector, qrCodeDataSelector } from '../state/app.selectors';
import { Observable, interval, take } from 'rxjs';

@Component({
  selector: 'app-qr-code-main',
  templateUrl: './qr-code-main.component.html',
  styleUrls: ['./qr-code-main.component.scss']
})
export class QrCodeMainComponent implements OnInit {
  @ViewChild('imageDownloadLink') imageDownloadLink!: ElementRef;

  routeData!: string;
  qrCodeLabel!: string;
  qrCodeImageBlob!: Blob;
  qrCodeImageData!: string;
  qrCodeDisabled: boolean = true;

  isDarkMode$ = this.store.select(darkModeSelector);
  qrCodeData$ = this.store.select(qrCodeDataSelector);


  timer$: Observable<number> = interval(1500).pipe(
    take(1)
  );
  isProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store
    ) { }

  ngOnInit(): void {    
    this.routeData = this.route.snapshot.data['tag'];     // Access the custom data from the route
    this.qrCodeLabel = `${this.routeData} - QR code`;;
    this.qrCodeImageData = 'assets/qr-code-example.png';
  }

  getVisible(name: string) {
    return name == this.route.snapshot.data['tag'];
  }

  onQrCodeImageBlob(qrCodeImageBlob: Blob)
  {
    this.qrCodeImageBlob = qrCodeImageBlob;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.qrCodeImageData = reader.result as string;
      this.qrCodeDisabled = false; 
    };

    if (this.qrCodeImageBlob) {
      reader.readAsDataURL(this.qrCodeImageBlob);
    }
  }

  onBtnDownloadQrCodeImage(): void {
    this.isProgress = true;
    this.timer$.subscribe(() => this.isProgress = false);


    const qrCodeImageBlobUrl = window.URL.createObjectURL(this.qrCodeImageBlob);
    // Create a download link and trigger a click event
    this.imageDownloadLink.nativeElement.href = qrCodeImageBlobUrl;
    this.imageDownloadLink.nativeElement.download = `QrCode${this.routeData}.png`;
    this.imageDownloadLink.nativeElement.click();
   }

}