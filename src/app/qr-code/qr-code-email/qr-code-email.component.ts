import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QrCodeGeneratorApiService } from '../../services/qr-code-generator-api.service';
import { UrlDTO } from '../../contracts/DTOs/UrlDTO';

@Component({
  selector: 'app-qr-code-email',
  templateUrl: './qr-code-email.component.html',
  styleUrls: ['./qr-code-email.component.scss']
})
export class QrCodeEmailComponent {
  @Output() qrCodeImageBlobEvent = new EventEmitter<Blob>();

  qrCodeUrlForm = this.formBuilder.group({
    url: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: QrCodeGeneratorApiService
    ) { }

  submitQrCodeRequest() {
    let urlDTO: UrlDTO = this.qrCodeUrlForm.value as UrlDTO;
    this.apiService.postQrCodeUrl(urlDTO).subscribe({
      next: (qrCodeImageBlob: Blob) => this.qrCodeImageBlobEvent.emit(qrCodeImageBlob),
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    });
  }

}
