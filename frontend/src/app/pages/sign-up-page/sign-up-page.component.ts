import { Component } from '@angular/core';
import {FieldModel} from "../../model/FieldModel";
import {ClienteModel} from "../../model/ClienteModel";
import {ClienteFieldModel} from "../../model/ClienteFieldModel";
import {EstabelecimentoFieldModel} from "../../model/EstabelecimentoFieldModel";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  clienteModel = new ClienteModel();
  formClientModel: FieldModel[] = new ClienteFieldModel().fields;
  formEstabelecimentoModel: FieldModel[] = new EstabelecimentoFieldModel().fields;
}
