import { speciality } from './../interfaces/speciality';
import { Injectable } from '@angular/core';
import { ennvironment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-respose';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  baseUrl : string = ennvironment.apiUrl+"speciality/"

  constructor(private http: HttpClient) { }

  list():Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }
  create(request: speciality):Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`,request);
  }

  update(request: speciality):Observable<ApiResponse> {
    //return this.http.put<ApiResponse>(`${this.baseUrl}${request.id}`,request);
    return this.http.put<ApiResponse>(`${this.baseUrl}`,request);
  }

  delete(id: number):Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }  
}
