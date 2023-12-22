import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { UrlDTO } from './DTOs/UrlDTO';

@Injectable({
  providedIn: 'root'
})
export class QrCodeGeneratorApiService {

  constructor(private httpClient: HttpClient) { }

  postQrCodeUrl(urlDTO: UrlDTO): Observable<Blob> {
    const apiUrl = 'http://localhost:7069/api/QrCodeUrlAsync';    

    return this.httpClient.post(apiUrl, urlDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }
}
