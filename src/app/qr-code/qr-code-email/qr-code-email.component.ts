import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../state/app.actions';
import { generatingQrCodeBlobSelector } from '../../state/app.selectors';
import { EmailDTO } from '../../contracts/DTOs/EmailDTO';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-qr-code-email',
  templateUrl: './qr-code-email.component.html',
  styleUrls: ['./qr-code-email.component.scss']
})
export class QrCodeEmailComponent {

  qrCodeEmailForm = this.formBuilder.group({
    email: ['', Validators.email],
    subject: ['', Validators.required],
    message: ['', null]
  });

  generatingQrCodeBlob$ = this.store.select(generatingQrCodeBlobSelector);

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store<AppState>
    ) { }

  submitQrCodeRequest() {
    this.store.dispatch(ApiActions.generateEmailQRCodeBlob({ emailDTO: this.qrCodeEmailForm.value as EmailDTO }));
  }

}
