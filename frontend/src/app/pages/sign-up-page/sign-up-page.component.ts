import { Component } from '@angular/core';
import {FieldModel} from "../../model/FieldModel";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  formClientModel: FieldModel[] = [
    {
      fieldName: "Nome",
      iconUrl: "",
      fieldType: "text"
    },
    {
      fieldName: "CPF",
      iconUrl: "",
      fieldType: "number"
    },
    {
      fieldName: "Email",
      iconUrl: "",
      fieldType: "email"
    },
    {
      fieldName: "Senha",
      iconUrl: "",
      fieldType: "password"
    },
    {
      fieldName: "Confirmar Senha",
      iconUrl: "",
      fieldType: "password"
    },
    {
      fieldName: "Logradouro",
      iconUrl: "",
      fieldType: "text"
    },
    {
      fieldName: "Bairro",
      iconUrl: "",
      fieldType: "text"
    },
    {
      fieldName: "Cidade",
      iconUrl: "",
      fieldType: "text"
    }
    ]
}
