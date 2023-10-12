import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EstabelecimentoService} from "../../services/estabelecimento.service";
import {Estabelecimento} from "../../model/response/Estabelecimento";
import {Constants} from "../../Constants";
import {Servico} from "../../model/response/Servico";
import {Agendamento} from "../../model/Agendamento";
import {AuthorizationService} from "../../services/authorization.service";
import {AgendaService} from "../../services/agenda.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AgendamentoResponse} from "../../model/response/AgendamentoResponse";

@Component({
  selector: 'app-create-agendamento-page',
  templateUrl: './create-agendamento-page.component.html',
  styleUrls: ['./create-agendamento-page.component.css']
})
export class CreateAgendamentoPageComponent  implements OnInit {

  estabelecimentoAvatar:string = Constants.DEFAULT_AVATAR;
  estabelecimento!:Estabelecimento;
  selectedService!:Servico;
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
    private authService:AuthorizationService,
    private agendaService:AgendaService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const estabelecimentoid = params.get('estabelecimentoid')

      if (estabelecimentoid) {
        this.estabelecimentoService.getEstabelecimento(estabelecimentoid)
          .subscribe(
            (response:Estabelecimento)=>{
              this.estabelecimento = response;
              if (response.urlFotoPerfil != undefined){
                this.estabelecimentoAvatar = response.urlFotoPerfil;
              }
            }
          )
      }
    })
  }

  ngOnInit(): void {

  }

  selectService(servico: Servico) {
    this.selectedService = servico;
  }

  selectHorario(horario:string) {
    this.selectedHorario = horario;
  }

  createAgendamento() {
    // TODO: Inserir validação de caso o usuário não esteja logado redirecione para a página de cadastro

    if(this.authService.isUserLogged()){

      this.verifyUserType();

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

    }else {
      this.userNeedsLogInWarning();
    }
  }

  onSuccess(agendamento:AgendamentoResponse){
    window.alert("Agendamento concluido com sucesso");
    //TODO: mostrar dialog de sucesso
  }

  onError(error:HttpErrorResponse){
    //TODO: Mostrar dialog de erro
    window.alert("Agendamento com erro \n"+ error.error.msg)
  }

  private userNeedsLogInWarning() {
    //TODO: Mostrar dialog de erro
    window.alert("Usuáriio Precisar estar logado para efetuar um agendamento")
  }

  private verifyUserType() {
    if(this.authService.getActiveSession().tipo !=1){
      //TODO: Mostrar dialog de erro
      window.alert("Usuário do tipo estabelecimento não pode efetuar agendamentos, por gentileza faça login com um usuário comum.")
    }
  }
}
