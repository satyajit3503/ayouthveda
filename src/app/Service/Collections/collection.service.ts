import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private getcollection = `${environment.apiUrl}/getCollections`;
  private savecollection = `${environment.apiUrl}/saveCollections`; 

  constructor(private http: HttpClient) {}

  getCollections(): Observable<any[]> {
    return this.http.get<any[]>(this.getcollection);
  }

  addCollection(collection: FormData): Observable<any> {
    return this.http.post<any>(this.savecollection, collection);
  }
}
