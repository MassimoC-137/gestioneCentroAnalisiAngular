import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalisiService {
  private baseUrl = 'http://localhost:8080/api/analisi';

  constructor(private http: HttpClient) { }

  getAnalisi(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/analisi`);
  }

  getAnalisiById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addAnalisi(analisi: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, analisi);
  }

  updateAnalisi(id: number, analisi: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, analisi);
  }

  deleteAnalisi(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  
  getAnalisiByMedicoId(medicoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/medico/${medicoId}`);
  }
  
}
