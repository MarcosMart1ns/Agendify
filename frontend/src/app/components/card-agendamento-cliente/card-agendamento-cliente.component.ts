import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  @Input() nomeEstabelecimento: string = '';

  constructor(private dialog: MatDialog) {}

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

  openCancelDialog() {
    const data = new Date(this.dataHora);

    // Obtém o fuso horário atual do sistema
    const fusoHorario = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Obtém o deslocamento em minutos para o fuso horário atual
    const deslocamentoMinutos = new Date().getTimezoneOffset();

    // Aplica o deslocamento do fuso horário à data
    data.setMinutes(data.getMinutes() - deslocamentoMinutos);

    // Obter hora e minutos
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');

    // Formatar como "hh:mm"
    const horaFormatada = `${horas}:${minutos}`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deseja realmente cancelar este agendamento?',
        content: `${this.nomeServico} para ${this.nome} as ${horaFormatada} com ${this.nomeEstabelecimento}`,
        confirmFunction: () => {
          dialogRef.close();
        },
      },
    });
  }
}
