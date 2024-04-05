import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppPageActions } from '../state/app.actions';
import { darkModeSelector, downloadingQrCodeBlobSelector, qrCodeBlobSelector, qrCodeDataSelector } from '../state/app.selectors';

@Component({
  selector: 'app-qr-code-main',
  templateUrl: './qr-code-main.component.html',
  styleUrls: ['./qr-code-main.component.scss']
})
export class QrCodeMainComponent implements OnInit, OnDestroy {
  @ViewChild('imageDownloadLink') imageDownloadLink!: ElementRef;

  private qrCodeBlobSubscription!: Subscription;
  private qrCodeBlob!: Blob;

  routeData!: string;
  qrCodeTitle!: string;
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
    this.qrCodeTitle = `${this.routeData} - QR code`;;
    this.qrCodeBlobSubscription = this.qrCodeBlob$.subscribe((blob) => {
      this.qrCodeBlob = blob!;
      if (this.qrCodeBlob) {
        this.qrCodeDisabled = false;
      }
    });
  }
  
  ngOnDestroy() {
    this.qrCodeBlobSubscription.unsubscribe();
  }

  onBtnDownloadQrCodeImage(): void {
    this.store.dispatch(
      AppPageActions.downloadQRCodeBlobBegin({ 
        blob: this.qrCodeBlob, 
        fileName: `QrCode${this.routeData}.png`, 
        element: this.imageDownloadLink, 
        period: 1500 
      })
    )
  }

}