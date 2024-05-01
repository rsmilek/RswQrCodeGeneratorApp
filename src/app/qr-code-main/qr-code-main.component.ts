import { Component, OnInit, ViewChild, ElementRef, effect } from '@angular/core';
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
export class QrCodeMainComponent implements OnInit {
  
  @ViewChild('imageDownloadLink') imageDownloadLink!: ElementRef;

  private routeTag!: string;

  public qrCodeTitle!: string;
  public qrCodeFormComponent!: any;

  public generatingQrCodeError = this.store.selectSignal(generatingQrCodeErrorSelector);
  public qrCodeBlob = this.store.selectSignal(qrCodeBlobSelector);
  public qrCodeBlobEnabled = this.store.selectSignal(qrCodeBlobEnabledSelector);
  public qrCodeData = this.store.selectSignal(qrCodeDataSelector);
  public downloadingQrCode = this.store.selectSignal(downloadingQrCodeBlobSelector);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) { 
    effect(() => {
      if (this.generatingQrCodeError() !== '') {
        this.notificationService.openErrorNotification('API call failed!');
      }
    });  
  }

  public ngOnInit(): void {
    this.routeTag = this.route.snapshot.data['tag'];
    this.qrCodeTitle = `${this.routeTag} - QR code`;
    this.qrCodeFormComponent = this.route.snapshot.data['qrCodeFormComponent'];
  }

  public onBtnDownloadQrCodeImage(): void {
    this.store.dispatch(
      AppPageActions.downloadQRCodeBlobBegin({
        blob: this.qrCodeBlob(),
        fileName: `QrCode${this.routeTag}.png`,
        element: this.imageDownloadLink,
        period: 1500
      })
    )
  }

}