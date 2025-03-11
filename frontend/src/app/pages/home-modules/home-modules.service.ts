import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeModuleService {
  private apiUrl = 'http://localhost:8000/modules';

  constructor(private http: HttpClient) {}

  getModules(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/modules/user/${userId}`).pipe(
      map(modules => {
        return modules.map(module => ({
          ...module,
          isBlocked: module.status === 'disponivel',
          tags: typeof module.tags === 'string' ? JSON.parse(module.tags) : module.tags // 🔥 Converte string para array
        }));
      })
    );
  }



}
