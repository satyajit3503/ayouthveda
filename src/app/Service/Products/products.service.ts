import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 private getGetProduct= `${environment.apiUrl}/getAllProduct`;
 private addImageById = `${environment.apiUrl}/saveProductImageById`;
  constructor(private http: HttpClient) { }
   getproducts(): Observable<any[]> {
      return this.http.get<any[]>(this.getGetProduct);
    }
    addProductImage(productId: number, formData: FormData): Observable<any> {
      const apiUrl = `${environment.apiUrl}/saveProductImageById?productId=${productId}`;
      return this.http.post<any>(apiUrl, formData);
    }
    
    
}
