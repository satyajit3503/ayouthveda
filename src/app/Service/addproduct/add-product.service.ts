import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private apiUrl = `${environment.apiUrl}/addProduct`;

  constructor(private http: HttpClient) {}

  addProduct(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
}
