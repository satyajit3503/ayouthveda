import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  private gettype = `${environment.apiUrl}/getTypes`;
  private saveTypeUrl = `${environment.apiUrl}/saveTypes`;
  private getTypeByCategory =`${environment.apiUrl}/getTypesByCategoryId`
  constructor(private http:HttpClient) { }

  getTypes():Observable<any[]>
  {
    return this.http.get<any[]>(this.gettype);
  }
  saveType(types:string[]):Observable <any>{
    return this.http.post<any>(this.saveTypeUrl, types)
  }

  getTypesByCategoryId(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.getTypeByCategory}?categoryId=${categoryId}`);
  }
}
