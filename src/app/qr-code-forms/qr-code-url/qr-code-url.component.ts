import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../state/app.actions';
import { generatingQrCodeBlobSelector } from '../../state/app.selectors';
import { UrlDTO } from '../../shared/contracts/DTOs/UrlDTO';
import { AppState } from '../../state/app.state';
import { createUrlValidator } from '../../shared/formValidators';

@Component({
  selector: 'app-qr-code-url',
  templateUrl: './qr-code-url.component.html',
  styleUrls: ['./qr-code-url.component.scss']
})
export class QrCodeUrlComponent {
  qrCodeUrlForm = this.formBuilder.group({
    url: ['', [Validators.required, createUrlValidator()]]
  });

  generatingQrCodeBlob$ = this.store.select(generatingQrCodeBlobSelector);

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store<AppState>
    ) { }

  submitQrCodeRequest() {
    this.store.dispatch(ApiActions.generateUrlQRCodeBlob({ urlDTO: this.qrCodeUrlForm.value as UrlDTO }));
  }

}
