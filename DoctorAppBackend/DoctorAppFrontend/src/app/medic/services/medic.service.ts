import { Injectable } from '@angular/core';
import { ennvironment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api-respose';
import { Observable } from 'rxjs';
import { Medic } from '../interfaces/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

 
  baseUrl : string = ennvironment.apiUrl+"medic/"

  constructor(private http: HttpClient) { }

  list():Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }
  create(request: Medic):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`,request);
  }

  update(request: Medic):Observable<ApiResponse> {
    //return this.http.put<ApiResponse>(`${this.baseUrl}${request.id}`,request);
    return this.http.put<ApiResponse>(`${this.baseUrl}`,request);
  }

  delete(id: number):Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }  

  
}
