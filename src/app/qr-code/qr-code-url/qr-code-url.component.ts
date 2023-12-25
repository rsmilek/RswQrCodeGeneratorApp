import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { QrCodeGeneratorApiService } from '../../services/qr-code-generator-api.service';
import { UrlDTO } from '../../contracts/DTOs/UrlDTO';

@Component({
  selector: 'app-qr-code-url',
  templateUrl: './qr-code-url.component.html',
  styleUrls: ['./qr-code-url.component.scss']
})
export class QrCodeUrlComponent {
  @ViewChild('imageDownloadLink') imageDownloadLink!: ElementRef;
  
  qrCodeImageData: any;
  qrCodeImageBlob!: Blob;
  qrCodeDisabled: boolean = true;

  qrCodeUrlForm = this.formBuilder.group({
    url: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: QrCodeGeneratorApiService
    ) {}
  
  ngOnInit(): void {
    this.qrCodeImageData = 'assets/qr-code-example.png';
  }

  submitQrCodeRequest() {
    let urlDTO: UrlDTO = this.qrCodeUrlForm.value as UrlDTO;
    this.apiService.postQrCodeUrl(urlDTO).subscribe({
      next: (qrCodeImageBlob: Blob) => {
        this.qrCodeImageBlob = qrCodeImageBlob;
        
        const reader = new FileReader();
        reader.onloadend = () => {
          this.qrCodeImageData = reader.result;
          this.qrCodeDisabled = false; 
        };

        if (this.qrCodeImageBlob) {
          reader.readAsDataURL(this.qrCodeImageBlob);
        }
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  downloadQrCodeImage(): void {
    if (!this.qrCodeImageBlob) return;

    const qrCodeImageBlobUrl = window.URL.createObjectURL(this.qrCodeImageBlob);
    // Create a download link and trigger a click event
    this.imageDownloadLink.nativeElement.href = qrCodeImageBlobUrl;
    this.imageDownloadLink.nativeElement.download = 'QrCodeImage.png';
    this.imageDownloadLink.nativeElement.click();
  }

}
