import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConcernService {
  private getconcern = `${environment.apiUrl}/getConcerns`;
  private saveConcernUrl = `${environment.apiUrl}/saveConcerns`;

  constructor(private http: HttpClient) { }

  getConcern(): Observable<any[]> {
    return this.http.get<any[]>(this.getconcern);
  }

  saveConcern(concernData: FormData): Observable<any> {
    return this.http.post<any>(this.saveConcernUrl, concernData);
  }
  
}
