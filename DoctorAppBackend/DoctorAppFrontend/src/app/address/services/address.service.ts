import { Injectable } from '@angular/core';
import { ennvironment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api-respose';
import { Observable } from 'rxjs';
import { address } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl : string = ennvironment.apiUrl+"address/"

  constructor(private http:HttpClient) { }

  list(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  create(request: address): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}`,request);
  }
  update(request: address): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`,request);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
