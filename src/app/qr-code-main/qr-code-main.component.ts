import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppPageActions } from '../state/app.actions';
import { darkModeSelector, downloadingQrCodeBlobSelector, qrCodeBlobSelector, qrCodeDataSelector } from '../state/app.selectors';

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
  qrCodeBlob$ = this.store.select(qrCodeBlobSelector);
  qrCodeData$ = this.store.select(qrCodeDataSelector);
  downloadingQrCode$ = this.store.select(downloadingQrCodeBlobSelector);

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
    this.qrCodeBlob$.subscribe((qrCodeBlob) =>
      this.store.dispatch(
        AppPageActions.downloadQRCodeBlobBegin({ 
          blob: qrCodeBlob, 
          fileName: `QrCode${this.routeData}.png`, 
          element: this.imageDownloadLink, 
          period: 1500 
        })
      )
    );
  }

}