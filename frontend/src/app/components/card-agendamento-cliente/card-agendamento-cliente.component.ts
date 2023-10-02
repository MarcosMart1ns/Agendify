import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-agendamento-cliente',
  templateUrl: './card-agendamento-cliente.component.html',
  styleUrls: ['./card-agendamento-cliente.component.css'],
})
export class CardAgendamentoClienteComponent {
  @Input() nome: string = '';
  @Input() urlImagem: string = '';
  @Input() status: string = '';
  @Input() nomeServico: string = '';
  @Input() dataHora: string = '';

  getColorByStatus(status: string) {
    switch (status) {
      case 'Agendado':
        return '#5F5F5F';
      case 'Cancelado':
        return '#D31004';
      default:
        return '#04D361';
    }
  }
}
