import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  /** Obtém o nome do usuário pelo ID */
  getUserName(userId: number): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(`${this.apiUrl}/user/${userId}`);
  }
}
