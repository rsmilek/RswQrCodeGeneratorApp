import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../state/app.state';
import { ApiActions } from '../../state/app.actions';
import { generatingQrCodeBlobSelector } from '../../state/app.selectors';
import { EmailDTO } from '../../shared/contracts/DTOs/EmailDTO';

@Component({
  selector: 'app-qr-code-form-email',
  templateUrl: './qr-code-form-email.component.html',
  styleUrls: ['./qr-code-form-email.component.scss']
})
export class QrCodeFormEmailComponent {

  public qrCodeEmailForm = this.formBuilder.group({
    email: ['', Validators.email],
    subject: ['', Validators.required],
    message: ['', null]
  });

  public generatingQrCodeBlob$ = this.store.select(generatingQrCodeBlobSelector);

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store<AppState>
    ) { }

  public submitQrCodeRequest() {
    this.store.dispatch(ApiActions.generateEmailQRCodeBlob({ emailDTO: this.qrCodeEmailForm.value as EmailDTO }));
  }

}
