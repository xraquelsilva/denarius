import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:8000';  // Substitua pela URL do seu backend

  constructor(private http: HttpClient) {}

  // Método para pegar o status de um módulo
  getModuleStatus(userId: string, moduleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/module_status/${userId}/${moduleId}`);
  }
}
