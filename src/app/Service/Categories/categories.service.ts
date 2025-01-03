import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private getcategory = `${environment.apiUrl}/getCategories`;
  private saveCategoryUrl = `${environment.apiUrl}/saveCategories`;
  private CategoryTypeMapping = `${environment.apiUrl}/mapCategoryType`;


  constructor(private http:HttpClient) { }
  getCategories():Observable<any[]>
  {
  return this.http.get<any[]>(this.getcategory);
  }

  mapCategoryType(payload: { categoryId: number; typeIds: number[] }): Observable<any> {
    return this.http.post<any>(this.CategoryTypeMapping, payload);
  }
  
  

  saveCategory(categories: string[]): Observable<any> {
    return this.http.post<any>(this.saveCategoryUrl, categories);
  }
}
