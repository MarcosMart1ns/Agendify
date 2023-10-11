import { Component, Input } from '@angular/core';
import { AgendamentoResponse } from 'src/app/model/response/AgendamentoResponse';

@Component({
  selector: 'app-lista-agendamentos-cliente-component',
  templateUrl: './lista-agendamentos-cliente-component.component.html',
  styleUrls: ['./lista-agendamentos-cliente-component.component.css']
})
export class ListaAgendamentosClienteComponentComponent {

  @Input() agendamentos:AgendamentoResponse[] = [];

}
