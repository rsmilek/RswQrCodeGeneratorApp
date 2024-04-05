import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../state/app.actions';
import { generatingQrCodeBlobSelector } from '../../state/app.selectors';
import { CzPaymentDTO } from '../../contracts/DTOs/CzPaymentDTO';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-qr-code-cz-payment',
  templateUrl: './qr-code-cz-payment.component.html',
  styleUrls: ['./qr-code-cz-payment.component.scss']
})
export class QrCodeCzPaymentComponent {

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
    const czPaymentDTO: CzPaymentDTO = this.qrCodeCzPaymentForm.value as CzPaymentDTO;
    this.store.dispatch(ApiActions.generateCZPaymentQRCodeBlob({ czPaymentDto: czPaymentDTO }));
  }

}
