import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppPageActions } from '../state/app.actions';
import { downloadingQrCodeBlobSelector, generatingQrCodeErrorSelector, qrCodeBlobEnabledSelector, qrCodeBlobSelector, qrCodeDataSelector } from '../state/app.selectors';
import { AppState } from '../state/app.state';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-qr-code-main',
  templateUrl: './qr-code-main.component.html',
  styleUrls: ['./qr-code-main.component.scss'],
  encapsulation: ViewEncapsulation.None // Enables usage of snackBar styly from component's .scss instead of styles.scss
})
export class QrCodeMainComponent implements OnInit, OnDestroy {
  @ViewChild('imageDownloadLink') imageDownloadLink!: ElementRef;

  private generatingQrCodeErrorSubscription!: Subscription;
  private qrCodeBlobSubscription!: Subscription;
  private qrCodeBlob!: Blob;

  routeData!: string;
  qrCodeTitle!: string;
  qrCodeBlobEnabled!: boolean;

  generatingQrCodeError$ = this.store.select(generatingQrCodeErrorSelector);
  qrCodeBlob$ = this.store.select(qrCodeBlobSelector);
  qrCodeBlobEnabled$ = this.store.select(qrCodeBlobEnabledSelector);
  qrCodeData$ = this.store.select(qrCodeDataSelector);
  downloadingQrCode$ = this.store.select(downloadingQrCodeBlobSelector);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {    
    this.routeData = this.route.snapshot.data['tag'];     // Access the custom data from the route
    this.qrCodeTitle = `${this.routeData} - QR code`;
    this.generatingQrCodeErrorSubscription = this.generatingQrCodeError$.subscribe((error) => {
      if (error !== '') {
        this.snackBar.open('API call failed!', 'X', this.createConfig(5000, 'snack-bar-error'));
      }
    });
    this.qrCodeBlobSubscription = this.qrCodeBlob$.subscribe((blob) => {
      this.qrCodeBlob = blob;
    });
  }
  
  ngOnDestroy() {
    this.generatingQrCodeErrorSubscription.unsubscribe();
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

  private createConfig(duration: number, panelClass: string): MatSnackBarConfig {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = duration;
    config.panelClass = panelClass;
    return config;
  }

}