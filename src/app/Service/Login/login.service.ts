import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseurl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  Login(login:any):Observable<any>
  {
    return this.http.post<any>(this.baseurl+"login",login);
  }
}
