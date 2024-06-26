import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/utente';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  promoteUser(id: number, roleCode: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/promote`, { roleCode });
  }

  demoteUser(id: number, roleCode: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/demote`, { roleCode });
  }

  searchUsers(searchValue: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?search=${searchValue}`);
  }

  addPazienteToMedico(medicoId: number, pazienteId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${medicoId}/addPaziente/${pazienteId}`, {});
  }  
}
