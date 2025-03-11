import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8000'; // Ajuste o URL para o seu backend

  constructor(private http: HttpClient) {}

  // Método para obter perguntas por módulo
  getQuestionsByModule(moduleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/modules/${moduleId}/questions`);
  }

// Método para desbloquear o módulo
unlockModule(userId: string | null, moduleId: string): Observable<any> {
  const body = { user_id: userId, module_id: moduleId }; // Certifique-se de que o nome dos campos está correto
  return this.http.post(`${this.apiUrl}/unlockModule`, body);
}



  getNextModuleStatus(userId: string | null, currentModuleId: string): Observable<string> {
    if (!userId || !currentModuleId) {
      throw new Error('Parâmetros de ID são necessários');
    }

    const url = `http://localhost:8000/checkModuleStatus?userId=${userId}&moduleId=${currentModuleId}`;

    return this.http.get<string>(url);
  }

  updateUserProgress(userId: string | null, xp: number, coin: number): Observable<any> {
    const url = `${this.apiUrl}/updateUserProgress?user_id=${userId}&xp=${xp}&coin=${coin}`;
    return this.http.post(url, {});
  }


}
