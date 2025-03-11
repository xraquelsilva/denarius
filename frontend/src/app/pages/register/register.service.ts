import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Isso já garante que ele está disponível globalmente
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/register';

  constructor(private http: HttpClient) {} // ✅ HttpClient injetado corretamente

  registerUser(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
