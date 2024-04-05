import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../state/app.actions';
import { generatingQrCodeBlobSelector } from '../../state/app.selectors';
import { EmailDTO } from '../../contracts/DTOs/EmailDTO';

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
    private store: Store
    ) { }

  submitQrCodeRequest() {
    const emailDTO: EmailDTO = this.qrCodeEmailForm.value as EmailDTO;
    this.store.dispatch(ApiActions.generateEmailQRCodeBlob({ emailDto: emailDTO }));
  }

}
