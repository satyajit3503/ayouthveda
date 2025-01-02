import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private SaveSellerurl = 'http://localhost:9090/ayouthveda/saveSellerUser';
  private getSellerurl = 'http://localhost:9090/ayouthveda/getAllSellerUser';

  constructor(private http: HttpClient) {}

  saveSellerUser(seller: any): Observable<any> {
    return this.http.post(this.SaveSellerurl, seller);
  }

  getSeller():Observable<any[]>
  {
  return this.http.get<any[]>(this.getSellerurl);
  }
}
