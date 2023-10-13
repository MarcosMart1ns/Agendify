import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-agendamento-estabelecimento',
  templateUrl: './card-agendamento-estabelecimento.component.html',
  styleUrls: ['./card-agendamento-estabelecimento.component.css'],
})
export class CardAgendamentoEstabelecimentoComponent {
  @Input() nome: string = '';
  @Input() urlImagem: string = '';
  @Input() status: string = '';
  @Input() nomeServico: string = '';
  @Input() dataHora: string = '';
}
