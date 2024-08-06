import { Injectable } from '@angular/core';
import { ennvironment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Interfaces/Login';
import { Observable } from 'rxjs';
import { Sesion } from '../Interfaces/sesion';


@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  baseUrl : string = ennvironment.apiUrl+"user/"
  constructor(private http: HttpClient) 
  { 

  }
  login(request:Login):Observable<Sesion>
  {
    return this.http.post<Sesion>('${this.baseUrl}login',request)
  }
}
