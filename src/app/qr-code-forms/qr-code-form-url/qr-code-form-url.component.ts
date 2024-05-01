import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../state/app.state';
import { ApiActions } from '../../state/app.actions';
import { generatingQrCodeBlobSelector } from '../../state/app.selectors';
import { createUrlValidator } from '../../shared/formValidators';
import { UrlDTO } from '../../shared/contracts/DTOs/UrlDTO';

@Component({
  selector: 'app-qr-code-form-url',
  templateUrl: './qr-code-form-url.component.html',
  styleUrls: ['./qr-code-form-url.component.scss']
})
export class QrCodeFormUrlComponent {

  public qrCodeUrlForm = this.formBuilder.group({
    url: ['', [Validators.required, createUrlValidator()]]
  });

  public generatingQrCodeBlob = this.store.selectSignal(generatingQrCodeBlobSelector);

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store<AppState>
    ) { }

  public submitQrCodeRequest() {
    this.store.dispatch(ApiActions.generateUrlQRCodeBlob({ urlDTO: this.qrCodeUrlForm.value as UrlDTO }));
  }

}
