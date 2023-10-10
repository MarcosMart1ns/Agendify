import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgendamentoResponse } from '../model/response/AgendamentoResponse';


@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private baseUrl = 'http://localhost:9090';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getUserCalendar(userId: string): Observable<AgendamentoResponse[]> {
    return this.httpClient.get<AgendamentoResponse[]>(
      `${this.baseUrl}/agenda/${userId}`,
      this.httpOptions
    );
  }

  cancelarAgendamento(agendamentoId:string): Observable<AgendamentoResponse>{
    return this.httpClient.patch<AgendamentoResponse>(
      `${this.baseUrl}/agenda/${agendamentoId}/cancelar`,
      this.httpOptions
    );
  }
}
