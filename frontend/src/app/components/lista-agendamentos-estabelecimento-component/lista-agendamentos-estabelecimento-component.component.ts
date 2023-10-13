import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgendamentoResponse } from 'src/app/model/response/AgendamentoResponse';
import { Authresponse } from 'src/app/model/response/Authresponse';
import { AgendaService } from 'src/app/services/agenda.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-lista-agendamentos-estabelecimento-component',
  templateUrl: './lista-agendamentos-estabelecimento-component.component.html',
  styleUrls: ['./lista-agendamentos-estabelecimento-component.component.css'],
})
export class ListaAgendamentosEstabelecimentoComponentComponent {
  selectedDate: Date | null = new Date();

  agendamentos: AgendamentoResponse[] = [];

  periodos: {
    manha: AgendamentoResponse[];
    tarde: AgendamentoResponse[];
    noite: AgendamentoResponse[];
  } = {
    manha: [],
    tarde: [],
    noite: [],
  };
  proximoAgendamento: AgendamentoResponse | null = null;

  constructor(
    private agendaService: AgendaService,
    private authService: AuthorizationService
  ) {
    console.log('Agendamentos constructor: ');
    console.log(this.agendamentos);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('agendamentos' in changes) {
      this.organizarAgendamentos();
    }
  }

  ngOnInit(): void {
    this.getAgendamentoByDate(new Date());
  }

  organizarAgendamentos() {
    for (const agendamento of this.agendamentos) {
      const dataAgendamento = new Date(agendamento.data);
      const hora = dataAgendamento.getHours();

      if (hora < 12) {
        this.periodos.manha.push(agendamento);
      } else if (hora < 17) {
        this.periodos.tarde.push(agendamento);
      } else {
        this.periodos.noite.push(agendamento);
      }
    }

    // Ordenar agendamentos em cada período por data
    const periodos: string[] = ['manha', 'tarde', 'noite'];

    for (const periodo of periodos) {
      const key = periodo as 'manha' | 'tarde' | 'noite'; // Supressão de tipo
      this.periodos[key].sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
      );
    }

    // Encontrar o próximo agendamento
    for (const periodo in this.periodos) {
      const key = periodo as 'manha' | 'tarde' | 'noite'; // Supressão de tipo
      if (this.periodos[key].length > 0) {
        this.proximoAgendamento = this.periodos[key][0];
        break; // Encerre a busca assim que encontrar o próximo agendamento
      }
    }
    console.log(this.agendamentos);
  }

  changedSelectedDate() {
    console.log(`new date value: ${this.selectedDate}`);
    if (this.selectedDate != null) {
      this.getAgendamentoByDate(this.selectedDate);
    }
  }

  private getAgendamentoByDate(date: Date) {
    let activeSession: Authresponse = this.authService.getActiveSession();
    this.agendaService
      .getAgendamentoByUserAndDate(activeSession.id, date)
      .subscribe((response) => {
        this.agendamentos = response;
        this.organizarAgendamentos();
      });
  }
}
