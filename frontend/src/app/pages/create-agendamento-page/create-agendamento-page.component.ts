import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EstabelecimentoService} from "../../services/estabelecimento.service";
import {Estabelecimento} from "../../model/response/Estabelecimento";
import {Constants} from "../../Constants";
import {Servico} from "../../model/response/Servico";
import {Agendamento} from "../../model/Agendamento";
import {AuthorizationService} from "../../services/authorization.service";
import {AgendaService} from "../../services/agenda.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AgendamentoResponse} from "../../model/response/AgendamentoResponse";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";
import {ErrorDialogModalComponent} from "../../components/error-dialog-modal/error-dialog-modal.component";
import {ConfirmDialogData} from "../../model/dialog/ConfirmDialogData";
import {SuccessDialogModalComponent} from "../../components/success-dialog-modal/success-dialog-modal.component";

@Component({
  selector: 'app-create-agendamento-page',
  templateUrl: './create-agendamento-page.component.html',
  styleUrls: ['./create-agendamento-page.component.css']
})
export class CreateAgendamentoPageComponent {

  estabelecimentoAvatar: string = Constants.DEFAULT_AVATAR;
  estabelecimento!: Estabelecimento;
  selectedService!: Servico;
  selectedDate!: Date;
  agendamento: Agendamento = {
    clienteId: '',
    data: '',
    estabelecimentoId: '',
    servicoId: ''
  }

  avaliableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "19:00",
  ]

  private selectedHorario!: string;

  constructor(
    private route: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService,
    private authService: AuthorizationService,
    private agendaService: AgendaService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const estabelecimentoid = params.get('estabelecimentoid')

      if (estabelecimentoid) {
        this.estabelecimentoService.getEstabelecimento(estabelecimentoid)
          .subscribe(
            (response: Estabelecimento) => {
              this.estabelecimento = response;
              if (response.urlFotoPerfil != undefined) {
                this.estabelecimentoAvatar = response.urlFotoPerfil;
              }
            }
          )
      }
    })
  }

  selectService(servico: Servico) {
    this.selectedService = servico;
  }

  selectHorario(horario: string) {
    this.selectedHorario = horario;
  }

  createAgendamento() {

    if (this.authService.isUserLogged()) {

      if (this.authService.getActiveSession().tipo != 1) {
        this.openErrorDialog(
          {
            title: 'Não foi possível efetuar agendamento',
            content: "Usuário do tipo estabelecimento não pode efetuar agendamentos, por gentileza faça login com um usuário comum.",
            confirmFunction: () => {
            }
          }
        )
      } else {

        this.agendamento.estabelecimentoId = this.estabelecimento.id;
        this.selectedDate.setUTCHours(Number(this.selectedHorario.substring(0, 2)), Number(this.selectedHorario.substring(3, 5)));

        this.agendamento = {
          clienteId: this.authService.getActiveSession().id,
          data: this.selectedDate?.toJSON(),
          estabelecimentoId: this.estabelecimento.id,
          servicoId: this.selectedService.id
        }

        this.agendaService.createAgenda(this.agendamento)
          .subscribe(
            (response) => {
              this.onSuccess(response);
            },
            (errorResponse: HttpErrorResponse) => {
              this.onError(errorResponse);
            }
          );
      }
    } else {
      this.userNeedsLogInWarning();
    }
  }

  onSuccess(agendamento: AgendamentoResponse) {
    const date = new Date(agendamento.data);
    const dateString:string = `Dia ${date.toLocaleDateString()} ás ${date.toLocaleTimeString()}`;

    this.dialog.open(SuccessDialogModalComponent, {

        data: {
          title: "Agendamento concluido com sucesso",
          content: `Agendado para: \n${dateString} para o serviço de ${agendamento.servico.nome} com ${agendamento.estabelecimento.nome}`,
          confirmFunction: () => {
            this.router.navigateByUrl("/home");
          }
        }
      }
    )
  }

  onError(error: HttpErrorResponse) {

    let errorMsg = '';

    if (error.status === 400) {
      errorMsg = `Agendamento com erro \n + ${error.error.msg}`
    } else if (error.status === 409) {
      errorMsg = error.error.msg;
    } else {
      errorMsg = "Agendamento não foi concluído pois aconteceu um erro inesperdo, tente novamente mais tarde";
    }

    this.openErrorDialog({
      title: 'Não foi possível efetuar agendamento',
      content: errorMsg,
      confirmFunction: () => {
      }
    })
  }

  private userNeedsLogInWarning() {
    this.openErrorDialog(
      {
        title: 'Não foi possível efetuar agendamento',
        content: 'É necessário estar logado para efetuar um agendamento',
        confirmFunction: () => {
          this.router.navigateByUrl("/signup");
        }
      }
    )
  }

  private openErrorDialog(dialogData: ConfirmDialogData) {
    this.dialog.open(ErrorDialogModalComponent, {
      data: dialogData
    })
  }
}
