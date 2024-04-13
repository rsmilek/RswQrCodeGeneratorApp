import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs'
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
    return this.httpClient
      .post(this.apiUrl + 'QrCodeUrlAsync', urlDTO, 
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }),
          responseType: 'blob'
        }
      )
      .pipe(catchError(this.handleError));    
  }

  postQrCodeEmail(emailDTO: EmailDTO): Observable<Blob> {
    return this.httpClient
      .post(this.apiUrl + 'QrCodeEmailAsync', emailDTO, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        responseType: 'blob',
      }
    )
    .pipe(catchError(this.handleError));        
  }

  postQrCodeCzPayment(czPaymentDTO: CzPaymentDTO): Observable<Blob> {
    return this.httpClient
      .post(this.apiUrl + 'QrCodeCzPaymentAsync', czPaymentDTO, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        responseType: 'blob',
      }
    )
    .pipe(catchError(this.handleError));        
  }

  private handleError({ message }: HttpErrorResponse) {
    return throwError(() => {
      console.log(`ERROR: ${message}`); 
      return message; 
    });
  }

}
