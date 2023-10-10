import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AgendaService } from 'src/app/services/agenda.service';

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
  @Input() idAgendamento: string = '';

  constructor(
    private dialog: MatDialog,
    private agendaService: AgendaService
  ) {}

  ngAfterContentInit() {
    this.setColorByStatus(this.status);
  }

  statusColor: string = '';

  setColorByStatus(status: string) {
    switch (status) {
      case 'AGENDADO':
        this.statusColor = '#04D361';
        break;
      case 'CANCELADO':
        this.statusColor = '#D31004';
        break;
      default:
        this.statusColor = '#5F5F5F';
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
          this.agendaService.cancelarAgendamento(this.idAgendamento).subscribe(
            (response) => {
              this.status = response.status;
              this.setColorByStatus(this.status);
              dialogRef.close();
            },
            (error) => {
              console.log(error);
              dialogRef.close();
            }
          );
        },
      },
    });
  }
  
}
