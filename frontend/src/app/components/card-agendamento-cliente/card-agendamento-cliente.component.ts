import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AgendaService } from 'src/app/services/agenda.service';
import { Constants } from 'src/app/Constants';

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

  protected readonly Constants = Constants;

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

    // Obter hora e minutos
    const horas = data.getUTCHours();
    const minutos =
      data.getUTCMinutes() < 10
        ? `0${data.getUTCMinutes()}`
        : data.getUTCMinutes();

    // Formatar como "hh:mm"
    const horaFormatada = `${horas}:${minutos}`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '398px',
      width: '336px',
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
