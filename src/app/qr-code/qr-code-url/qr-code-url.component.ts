import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QrCodeGeneratorApiService } from '../../services/qr-code-generator-api.service';
import { UrlDTO } from '../../contracts/DTOs/UrlDTO';

@Component({
  selector: 'app-qr-code-url',
  templateUrl: './qr-code-url.component.html',
  styleUrls: ['./qr-code-url.component.scss']
})
export class QrCodeUrlComponent {
  @Output() readonly qrCodeImageBlobEvent = new EventEmitter<Blob>();

  qrCodeUrlForm = this.formBuilder.group({
    url: ['', [Validators.required, this.urlValidator]]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: QrCodeGeneratorApiService
    ) { }

  urlValidator(control: any) {
    if (!control.value) {
      return null; // If the control is empty, validation passes (handled by required validator)
    }
    // Pattern taken: https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
    const urlPattern = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return urlPattern.test(control.value) ? null : { 'invalidUrl': true };
  }

  submitQrCodeRequest() {
    let urlDTO: UrlDTO = this.qrCodeUrlForm.value as UrlDTO;
    this.apiService.postQrCodeUrl(urlDTO).subscribe({
      next: (qrCodeImageBlob: Blob) => this.qrCodeImageBlobEvent.emit(qrCodeImageBlob),
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    });
  }

}
