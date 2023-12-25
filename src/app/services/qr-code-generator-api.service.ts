import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment';
import { UrlDTO } from '../contracts/DTOs/UrlDTO';

const API_URL = environment.qrCodeGeneratorApiUrl;    

@Injectable({
  providedIn: 'root'
})
export class QrCodeGeneratorApiService {

  constructor(private httpClient: HttpClient) { }

  postQrCodeUrl(urlDTO: UrlDTO): Observable<Blob> {

    return this.httpClient.post(API_URL, urlDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'blob',
    });    
  }
}
