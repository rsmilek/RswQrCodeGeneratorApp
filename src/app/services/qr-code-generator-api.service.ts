import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment';
import { UrlDTO } from '../shared/contracts/DTOs/UrlDTO';
import { EmailDTO } from '../shared/contracts/DTOs/EmailDTO';
import { CzPaymentDTO } from '../shared/contracts/DTOs/CzPaymentDTO';

@Injectable({
  providedIn: 'root'
})
export class QrCodeGeneratorApiService {
  private readonly apiUrl = environment.qrCodeGeneratorApiUrl;

  constructor(private httpClient: HttpClient) { }

  postQrCodeUrl(urlDTO: UrlDTO): Observable<Blob> {
    return this.httpClient.post(this.apiUrl + 'QrCodeUrlAsync', urlDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }

  postQrCodeEmail(emailDTO: EmailDTO): Observable<Blob> {
    return this.httpClient.post(this.apiUrl + 'QrCodeEmailAsync', emailDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }

  postQrCodeCzPayment(czPaymentDTO: CzPaymentDTO): Observable<Blob> {
    return this.httpClient.post(this.apiUrl + 'QrCodeCzPaymentAsync', czPaymentDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }

}
