import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment';
import { UrlDTO } from '../contracts/DTOs/UrlDTO';
import { EmailDTO } from '../contracts/DTOs/EmailDTO';
import { CzPaymentDTO } from '../contracts/DTOs/CzPaymentDTO';

const API_URL = environment.qrCodeGeneratorApiUrl;    

@Injectable({
  providedIn: 'root'
})
export class QrCodeGeneratorApiService {

  constructor(private httpClient: HttpClient) { }

  postQrCodeUrl(urlDTO: UrlDTO): Observable<Blob> {
    return this.httpClient.post(API_URL + 'QrCodeUrlAsync', urlDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }

  postQrCodeEmail(emailDTO: EmailDTO): Observable<Blob> {
    return this.httpClient.post(API_URL + 'QrCodeEmailAsync', emailDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }

  postQrCodeCzPayment(czPaymentDTO: CzPaymentDTO): Observable<Blob> {
    return this.httpClient.post(API_URL + 'QrCodeCzPaymentAsync', czPaymentDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }

}
