import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgendamentoResponse } from 'src/app/model/response/AgendamentoResponse';


@Component({
  selector: 'app-lista-agendamentos-estabelecimento-component',
  templateUrl: './lista-agendamentos-estabelecimento-component.component.html',
  styleUrls: ['./lista-agendamentos-estabelecimento-component.component.css'],
})
export class ListaAgendamentosEstabelecimentoComponentComponent {
  @Input() agendamentos: AgendamentoResponse[] = [];

  selectedDate: Date | null = new Date;

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

  constructor() {
    console.log('Agendamentos constructor: ');
    console.log(this.agendamentos);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('agendamentos' in changes) {
      this.organizarAgendamentos();
    }
  }

  ngOnInit(): void {
    console.log('Agendamentos init: ');
    console.log(this.agendamentos);
    this.organizarAgendamentos();
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
    console.log(this.proximoAgendamento);
    console.log(this.periodos);
  }
}
