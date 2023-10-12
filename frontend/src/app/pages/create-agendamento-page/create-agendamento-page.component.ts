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

  estabelecimento!:Estabelecimento;
  selectedService!:Servico;
  agendamento: Agendamento = {
    clienteId: '',
    data: '',
    estabelecimentoId: '',
    servicoId: ''
  }

  constructor(
    private route: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const estabelecimentoid = params.get('estabelecimentoid')

      if (estabelecimentoid) {
        this.estabelecimentoService.getEstabelecimento(estabelecimentoid)
          .subscribe(
            (response:Estabelecimento)=>{
              this.estabelecimento = response;
            }
          )
      }
    })
  }

  protected readonly Constants = Constants;

  selectService(servico: Servico) {
    this.selectedService = servico;
  }

  createAgendamento() {
    // TODO: Inserir validação de caso o usuário não esteja logado redirecione para a página de cadastro

    this.agendamento.estabelecimentoId = this.estabelecimento.id;

    this.agendamento = {
      clienteId: '',
      data: '',
      estabelecimentoId:  this.estabelecimento.id,
      servicoId: this.selectedService.id
    }

    console.log(this.agendamento)
  }
}
