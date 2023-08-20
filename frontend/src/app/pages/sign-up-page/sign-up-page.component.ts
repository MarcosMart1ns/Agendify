import {Component, OnInit} from '@angular/core';
import {FieldModel} from "../../model/FieldModel";
import {ClienteFormModel} from "../../model/ClienteFormModel";
import {ClienteFieldModel} from "../../model/ClienteFieldModel";
import {EstabelecimentoFieldModel} from "../../model/EstabelecimentoFieldModel";
import {ClienteService} from "../../services/cliente.service";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  clienteModel = new ClienteFormModel().model;
  formClientModel: FieldModel[] = new ClienteFieldModel().fields;
  formEstabelecimentoModel: FieldModel[] = new EstabelecimentoFieldModel().fields;

  constructor(
      private clienteService:ClienteService
  ) {
  }

  formSubmit(cliente:ClienteFormModel){
    this.clienteService.createCliente(cliente)
  }
}
