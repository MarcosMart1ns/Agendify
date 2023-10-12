import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EstabelecimentoService} from "../../services/estabelecimento.service";
import {Estabelecimento} from "../../model/response/Estabelecimento";
import {Constants} from "../../Constants";
import {Servico} from "../../model/response/Servico";
import {Agendamento} from "../../model/Agendamento";

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
    private estabelecimentoService: EstabelecimentoService
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

    this.agendamento.estabelecimentoId = this.estabelecimento.id;
    console.log(Number(this.selectedHorario.substring(0, 2)),Number(this.selectedHorario.substring(3,4)))
    this.selectedDate.setUTCHours(Number(this.selectedHorario.substring(0, 2)),Number(this.selectedHorario.substring(3,5)));
    this.agendamento = {
      clienteId: '',
      // @ts-ignore
      data:this.selectedDate?.toJSON(),
      estabelecimentoId:  this.estabelecimento.id,
      servicoId: this.selectedService.id
    }

    console.log(this.agendamento)
  }
}
