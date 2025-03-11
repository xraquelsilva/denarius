import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ user_id: number, access_token: string }> {
    return this.http.post<{ user_id: number, access_token: string }>(this.apiUrl, { email, password });
  }
}
