import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QrCodeGeneratorApiService } from '../../services/qr-code-generator-api.service';
import { EmailDTO } from '../../contracts/DTOs/EmailDTO';

@Component({
  selector: 'app-qr-code-email',
  templateUrl: './qr-code-email.component.html',
  styleUrls: ['./qr-code-email.component.scss']
})
export class QrCodeEmailComponent {
  @Output() qrCodeImageBlobEvent = new EventEmitter<Blob>();

  qrCodeEmailForm = this.formBuilder.group({
    email: ['', Validators.email],
    subject: ['', Validators.required],
    message: ['', null]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: QrCodeGeneratorApiService
    ) { }

  submitQrCodeRequest() {
    let emailDTO: EmailDTO = this.qrCodeEmailForm.value as EmailDTO;
    this.apiService.postQrCodeEmail(emailDTO).subscribe({
      next: (qrCodeImageBlob: Blob) => this.qrCodeImageBlobEvent.emit(qrCodeImageBlob),
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    });
  }

}
