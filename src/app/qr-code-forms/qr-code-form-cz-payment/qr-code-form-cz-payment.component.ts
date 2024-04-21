import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../state/app.actions';
import { generatingQrCodeBlobSelector } from '../../state/app.selectors';
import { CzPaymentDTO } from '../../shared/contracts/DTOs/CzPaymentDTO';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-qr-code-form-cz-payment',
  templateUrl: './qr-code-form-cz-payment.component.html',
  styleUrls: ['./qr-code-form-cz-payment.component.scss']
})
export class QrCodeFormCzPaymentComponent {

  qrCodeCzPaymentForm = this.formBuilder.group({
    prefix: ['', null],
    account: ['', Validators.minLength(10)],
    bank: ['', Validators.minLength(4)],
    amount: ['0.00', Validators.required],
    variableSymbol: ['', null],
    specificSymbol: ['', null],
    constantSymbol: ['', null],
    message: ['', null]
  });

  generatingQrCodeBlob$ = this.store.select(generatingQrCodeBlobSelector);

  constructor(
    private formBuilder: FormBuilder, 
    private store: Store<AppState>
    ) { }

  submitQrCodeRequest() {
    this.store.dispatch(ApiActions.generateCZPaymentQRCodeBlob({ czPaymentDTO: this.qrCodeCzPaymentForm.value as CzPaymentDTO }));
  }

}