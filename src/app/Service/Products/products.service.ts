import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private jsonUrl = 'assets/products.json'; 
 private getGetProduct= `${environment.apiUrl}/getAllProduct`;
 private addImageById = `${environment.apiUrl}/saveProductImageById`;
  constructor(private http: HttpClient) { }
  //  getproducts(): Observable<any[]> {
  //     return this.http.get<any[]>(this.getGetProduct);
  //   }
  getproducts(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
    addProductImage(productId: number, formData: FormData): Observable<any> {
      const apiUrl = `${environment.apiUrl}/saveProductImageById?productId=${productId}`;
      return this.http.post<any>(apiUrl, formData);
    }
  


    getProductDetailById(productId: number): Observable<any> {
      return new Observable((observer) => {
        this.http.get<any>(this.jsonUrl).subscribe(
          (response) => {
            const products = response.serviceResponse || [];
            const product = products.find((p: any) => p.id === productId);
            if (product) {
              observer.next(product);
            } else {
              observer.error(`Product with ID ${productId} not found`);
            }
            observer.complete();
          },
          (error) => {
            observer.error(`Error fetching product data: ${error.message}`);
          }
        );
      });
    }
    
    }
