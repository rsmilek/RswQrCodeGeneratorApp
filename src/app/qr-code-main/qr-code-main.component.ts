import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-qr-code-main',
  templateUrl: './qr-code-main.component.html',
  styleUrls: ['./qr-code-main.component.scss']
})
export class QrCodeMainComponent implements OnInit {
  @ViewChild('imageDownloadLink') imageDownloadLink!: ElementRef;

  routeData!: string;

  qrCodeLabel!: string;

  qrCodeImageData: any;
  qrCodeImageBlob!: Blob;
  qrCodeDisabled: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.routeData = this.route.snapshot.data['tag'];     // Access the custom data from the route
    this.qrCodeLabel = `${this.routeData} - QR code`;;
    this.qrCodeImageData = 'assets/qr-code-example.png';
  }

  getVisible(name: string) {
    return name == this.route.snapshot.data['tag'];
  }

  public onQrCodeImageBlob(qrCodeImageBlob: Blob)
  {
    this.qrCodeImageBlob = qrCodeImageBlob;
        
    const reader = new FileReader();
    reader.onloadend = () => {
      this.qrCodeImageData = reader.result;
      this.qrCodeDisabled = false; 
    };

    if (this.qrCodeImageBlob) {
      reader.readAsDataURL(this.qrCodeImageBlob);
    }
  }

  onBtnDownloadQrCodeImage(): void {
    const qrCodeImageBlobUrl = window.URL.createObjectURL(this.qrCodeImageBlob);
    // Create a download link and trigger a click event
    this.imageDownloadLink.nativeElement.href = qrCodeImageBlobUrl;
    this.imageDownloadLink.nativeElement.download = `QrCode${this.routeData}.png`;
    this.imageDownloadLink.nativeElement.click();
  }

}