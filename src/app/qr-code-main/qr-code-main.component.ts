import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { NotificationService } from '../services/notification.service';
import { AppState } from '../state/app.state';
import { AppPageActions } from '../state/app.actions';
import { downloadingQrCodeBlobSelector, generatingQrCodeErrorSelector, qrCodeBlobEnabledSelector, qrCodeBlobSelector, qrCodeDataSelector } from '../state/app.selectors';

@Component({
  selector: 'app-qr-code-main',
  templateUrl: './qr-code-main.component.html',
  styleUrls: ['./qr-code-main.component.scss']
})
export class QrCodeMainComponent implements OnInit, OnDestroy {
  
  @ViewChild('imageDownloadLink') imageDownloadLink!: ElementRef;

  private routeTag!: string;
  private generatingQrCodeErrorSubscription!: Subscription;
  private qrCodeBlobSubscription!: Subscription;
  private qrCodeBlob!: Blob;

  public qrCodeTitle!: string;
  public qrCodeFormComponent!: any;

  public generatingQrCodeError$ = this.store.select(generatingQrCodeErrorSelector);
  public qrCodeBlob$ = this.store.select(qrCodeBlobSelector);
  public qrCodeBlobEnabled = this.store.selectSignal(qrCodeBlobEnabledSelector);
  public qrCodeData = this.store.selectSignal(qrCodeDataSelector);
  public downloadingQrCode = this.store.selectSignal(downloadingQrCodeBlobSelector);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.routeTag = this.route.snapshot.data['tag'];
    this.qrCodeTitle = `${this.routeTag} - QR code`;
    this.qrCodeFormComponent = this.route.snapshot.data['qrCodeFormComponent'];
    this.generatingQrCodeErrorSubscription = this.generatingQrCodeError$.subscribe((error) => {
      if (error !== '') {
        this.notificationService.openErrorNotification('API call failed!');
      }
    });
    this.qrCodeBlobSubscription = this.qrCodeBlob$.subscribe((blob) => {
      this.qrCodeBlob = blob;
    });
  }

  public ngOnDestroy() {
    this.generatingQrCodeErrorSubscription.unsubscribe();
    this.qrCodeBlobSubscription.unsubscribe();
  }

  public onBtnDownloadQrCodeImage(): void {
    this.store.dispatch(
      AppPageActions.downloadQRCodeBlobBegin({
        blob: this.qrCodeBlob,
        fileName: `QrCode${this.routeTag}.png`,
        element: this.imageDownloadLink,
        period: 1500
      })
    )
  }

}