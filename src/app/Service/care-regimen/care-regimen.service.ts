import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareRegimenService {

private getCareRegimen = `${environment.apiUrl}/getCareRegimens`;
  private savecareRegimenUrl = `${environment.apiUrl}/saveCareRegimen`;

  constructor(private http: HttpClient) { }

  getcareRegimen(): Observable<any[]> {
    return this.http.get<any[]>(this.getCareRegimen);
  }

  savecareRegimen(careRegimenData: FormData): Observable<any> {
    return this.http.post<any>(this.savecareRegimenUrl, careRegimenData);
  }
}
