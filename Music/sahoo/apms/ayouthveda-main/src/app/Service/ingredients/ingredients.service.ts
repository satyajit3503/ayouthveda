import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

 private getIngredients = `${environment.apiUrl}/getIngredients`;
  private saveingredientsUrl = `${environment.apiUrl}/saveIngredients`;

  constructor(private http: HttpClient) { }

  getingredients(): Observable<any[]> {
    return this.http.get<any[]>(this.getIngredients);
  }

  saveingredients(ingredientsData: FormData): Observable<any> {
    return this.http.post<any>(this.saveingredientsUrl, ingredientsData);
  }
  }
