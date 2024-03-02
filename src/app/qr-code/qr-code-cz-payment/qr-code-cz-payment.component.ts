import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QrCodeGeneratorApiService } from '../../services/qr-code-generator-api.service';
import { CzPaymentDTO } from '../../contracts/DTOs/CzPaymentDTO';

@Component({
  selector: 'app-qr-code-cz-payment',
  templateUrl: './qr-code-cz-payment.component.html',
  styleUrls: ['./qr-code-cz-payment.component.scss']
})
export class QrCodeCzPaymentComponent {
  @Output() readonly qrCodeImageBlobEvent = new EventEmitter<Blob>();

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

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: QrCodeGeneratorApiService
    ) { }

  submitQrCodeRequest() {
    let czPaymentDTO: CzPaymentDTO = this.qrCodeCzPaymentForm.value as CzPaymentDTO;
    this.apiService.postQrCodeCzPayment(czPaymentDTO).subscribe({
      next: (qrCodeImageBlob: Blob) => this.qrCodeImageBlobEvent.emit(qrCodeImageBlob),
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    });
  }

}
